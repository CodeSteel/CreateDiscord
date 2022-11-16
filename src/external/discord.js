import {
  Client,
  GatewayIntentBits,
  EmbedBuilder,
  Collection,
  Events,
  REST,
  Routes,
} from "discord.js";
import fs from "fs";
import * as dotenv from "dotenv";
dotenv.config();

import { createRequire } from "module";
const require = createRequire(import.meta.url);

const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
const DISCORD_CLIENT = process.env.DISCORD_CLIENT;

let client;

const getCommands = () => {
  client.commands = new Collection();

  const commandList = [];

  const commandFiles = fs
    .readdirSync("./src/commands")
    .filter((f) => f.endsWith(".cjs"));
  for (const file of commandFiles) {
    const command = require(`../commands/${file}`);
    commandList.push(command);
  }

  return commandList;
};

export const initializeBot = async () => {
  client = new Client({ intents: [GatewayIntentBits.Guilds] });

  client.on("ready", async () => {
    console.log(`Logged in as ${client.user.tag}!`);

    //** Load commands */
    const commandList = getCommands();
    const jsonCommands = commandList.map((command) => command.data.toJSON());
    const rest = new REST({ version: "9" }).setToken(DISCORD_TOKEN);

    try {
      console.log("Started refreshing application (/) commands.");

      await rest.put(Routes.applicationCommands(DISCORD_CLIENT), {
        body: jsonCommands,
      });

      console.log("Successfully reloaded application (/) commands.");
    } catch (error) {
      console.error(error);
    }
  });

  //* Listen for commands */
  client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const command = getCommands().find(
      (c) => c.data.name === interaction.commandName
    );

    if (!command) {
      console.error(
        `No command matching ${interaction.commandName} was found.`
      );
      return;
    }

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    }
  });

  client.login(DISCORD_TOKEN);
};

export const getBot = () => client;

export const sendMessage = (channel, title, message, url) => {
  const embed = new EmbedBuilder()
    .setTitle(title)
    .setColor(0x00ae86)
    .setDescription(message + "\n\n" + url);

  client.channels.cache.get(channel).send({
    embeds: [embed],
  });
};
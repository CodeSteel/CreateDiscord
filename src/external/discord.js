import {
  Client,
  GatewayIntentBits,
  EmbedBuilder,
  Collection,
  Events,
  REST,
  Routes,
  ActivityType,
} from "discord.js";
import fs from "fs";
import * as dotenv from "dotenv";
dotenv.config();
import { GetServerData } from "./server_request.js";
import { getCompletion } from "./openai.js";

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
    console.log(`Loaded command ${command.data.name}`);
  }

  return commandList;
};

export const initializeBot = async () => {
  client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
    ],
  });

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

    updateBotServerPresence();

    setInterval(() => {
      updateBotServerPresence();
    }, process.env.UPDATE_RATE);
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

  // listen to message events from the channel process.env.GPT_CHANNEL
  client.on(Events.MessageCreate, async (message) => {
    console.log(message.content);
    if (message.author.bot) return;

    if (message.channel.id === process.env.GPT_CHANNEL) {
      if (message.content.startsWith("!")) return;
      const reply = await message.reply(":thinking:");

      const lastFewMessagesFromUserInChannel =
        message.channel.messages.cache.filter(
          (m) => m.author.id === message.author.id
        );

      const lastFewMessagesFromBotInChannel =
        message.channel.messages.cache.filter(
          (m) => m.author.id === client.user.id
        );

      const userContent = lastFewMessagesFromUserInChannel.map(
        (m) => m.content
      );

      const botContent = lastFewMessagesFromBotInChannel.map((m) => m.content);

      const completion = await getCompletion(
        message.author.username,
        message.content,
        userContent,
        botContent
      );

      if (!completion || completion == null) {
        return reply.edit("No response from GPT-3.");
      }

      if (completion.length > 2000)
        return reply.edit("Response from GPT-3 is too long to be sent.");

      await reply.edit(completion);
    }
  });

  client.login(DISCORD_TOKEN);
};

const updateBotServerPresence = () => {
  GetServerData((playerCount) => {
    updatePresence(playerCount);
    updateEmbed(playerCount);
  });
};

export const getBot = () => client;

export const updatePresence = (playerCount) => {
  client.user.setActivity(playerCount + " Online!", {
    type: ActivityType.Playing,
  });
};

export const updateEmbed = async (playerCount) => {
  const title = "Connect to " + process.env.GAMEMODE;
  console.log("Updating embed... (" + playerCount + ")");
  let connectionString = process.env.CONNECTION_STRING;
  let embed = new EmbedBuilder()
    .setTitle(title)
    .setColor(process.env.EMBED_COLOR)
    .setDescription(
      "**Players: " + playerCount + "**\nConnect: " + connectionString
    );

  let foundMessage = false;
  await client.channels
    .fetch(process.env.EMBED_CHANNEL)
    .then(async (channel) => {
      await channel.messages.fetch({ limit: 5 }).then((messages) => {
        for (let message of messages) {
          console.log(message[1].embeds[0].data.title);
          if (message[1].embeds[0].data.title.includes("Connect")) {
            message[1].edit({ embeds: [embed] });
            foundMessage = true;
            return;
          }
        }
      });
    });

  if (!foundMessage) {
    console.log("No message found, creating new one...");
    client.channels.fetch(process.env.EMBED_CHANNEL).then((channel) => {
      channel.send({ embeds: [embed] });
    });
  }
};

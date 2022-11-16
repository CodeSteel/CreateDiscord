const SlashCommandBuilder = require("@discordjs/builders").SlashCommandBuilder;
const data = require("../external/data.cjs");
const discord = require('discord.js');
const {EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle} = discord;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("placenewissue")
    .setDescription("Places the embed for creating a new issue"),
  async execute(interaction) {
    const embed = new EmbedBuilder()
    .setTitle("Create a new Issue")
    .setColor(0xffffff)
    .setDescription("Press the button corresponding with the repository to create a new issue");

    const repos = await data.getAllRepo();

    // add buttons for each repo
    const row = new ActionRowBuilder();
    for (const repo of repos) {
      const button = new ButtonBuilder()
      .setCustomId("modal-" + repo)
      .setLabel(repo)
      .setStyle(3);
      row.addComponents(button);
    }
        

    interaction.channel.send({
        embeds: [
            embed
        ],
        components: [
            row
        ]
    });

    await interaction.reply({ content: "Embed has been placed!", ephemeral: true });
  },
};

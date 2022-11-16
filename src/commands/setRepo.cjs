const SlashCommandBuilder = require("@discordjs/builders").SlashCommandBuilder;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("setrepo")
    .setDescription("Set a repository to get updates on it")
    .addStringOption((option) =>
      option
        .setName("webhook")
        .setDescription("The webhook to send the updates to")
        .setRequired(true)
    ),
  async execute(interaction) {
    await interaction.reply("Pong!");
  },
};

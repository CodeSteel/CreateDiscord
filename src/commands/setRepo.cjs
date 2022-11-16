const SlashCommandBuilder = require("@discordjs/builders").SlashCommandBuilder;
const data = require("../external/data.cjs");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("setrepo")
    .setDescription("Set a repository to get updates on it")
    .addStringOption((option) =>
      option
        .setName("repo")
        .setDescription("The repository to get updates on")
        .setRequired(true)
    ),
  async execute(interaction) {
    const repo = interaction.options.getString("repo");

    data.setRepo(repo, {
      channel: interaction.channel.name,
    });

    await interaction.reply(
      "Repository `" +
        repo +
        "` has been set to channel <" +
        interaction.channel.id +
        ">"
    );
  },
};

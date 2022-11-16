// const setRepo = require("../external/data.js").setRepo;
const SlashCommandBuilder = require("@discordjs/builders").SlashCommandBuilder;

// dynamic import the data module
const setRepo = import("../external/data.js").setRepo;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("setrepo")
    .setDescription("Set a repository to get updates on it")
    .addStringOption((option) =>
      option
        .setName("repo")
        .setDescription("The repository to get updates on")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("webhook")
        .setDescription("The webhook to send the updates to")
        .setRequired(true)
    ),
  async execute(interaction) {
    const webhook = interaction.options.getString("webhook");
    const repo = interaction.options.getString("repo");

    // use the dynamic import to call the setRepo function
    setRepo(repo, {
      channel: interaction.channel.name,
      webhook: webhook,
    });

    // require("../external/data.js").setRepo(repo, {
    //   webhook: webhook,
    //   channel: interaction.channel.name,
    // });
    await interaction.reply(
      "Webhook has been set successfully for channel #" +
        interaction.channel.name +
        "!"
    );
  },
};

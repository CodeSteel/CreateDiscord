const SlashCommandBuilder = require("@discordjs/builders").SlashCommandBuilder;
const { getCompletion } = require("../external/openai.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("gpt")
    .setDescription("Generates text using GPT-3")
    .addStringOption((option) =>
      option
        .setName("prompt")
        .setDescription("Prompt for GPT-3")
        .setRequired(true)
    ),

  async execute(interaction) {
    await interaction.reply(":thinking:");

    const completion = await getCompletion(
      interaction.user.username,
      interaction.options.getString("prompt")
    );

    if (!completion || completion == null)
      return interaction.editReply("No response from GPT-3.");

    if (completion.length > 2000)
      return interaction.editReply(
        "Response from GPT-3 is too long to be sent."
      );

    await interaction.editReply(completion);
  },
};

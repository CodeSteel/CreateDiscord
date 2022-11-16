const SlashCommandBuilder = require("@discordjs/builders").SlashCommandBuilder;
const ModalBuilder = require("@discordjs/builders").ModalBuilder;
const TextInputBuilder = require("@discordjs/builders").TextInputBuilder;
const TextInputStyle = require("@discordjs/builders").TextInputStyle;
const ActionRowBuilder = require("@discordjs/builders").ActionRowBuilder;
// const octo = require("../external/octo.cjs");

module.exports = {
  data: {
    name: "createissuemodal",
  },
  async execute(interaction, repo) {
    const modal = new ModalBuilder()
      .setTitle("Create a new Issue")
      .setCustomId("createissue");

    const titleInput = new TextInputBuilder()
			.setCustomId('titleInput')
			.setLabel("What is the title of the issue?")
			.setStyle("Short");

		const bodyInput = new TextInputBuilder()
			.setCustomId('bodyInput')
			.setLabel("What is the body of the issue?")
			.setStyle("Paragraph");

    // add checkbox for isBug
    const isBugInput = new TextInputBuilder()
      .setCustomId('isBugInput')
      .setLabel("Is this a bug?")
      .setPlaceholder("Yes or No")
      .setStyle("Short");

		const actionRow1 = new ActionRowBuilder().addComponents(titleInput);
		const actionRow2 = new ActionRowBuilder().addComponents(bodyInput);
    const actionRow3 = new ActionRowBuilder().addComponents(isBugInput);

		modal.addComponents(actionRow1, actionRow2, actionRow3);

    await interaction.showModal(modal);

    // on submit
    const title = interaction.data.values.titleInput;
    await interaction.reply({ content: `Title: ${title}`, ephemeral: true });
  },
};

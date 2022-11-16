const SlashCommandBuilder = require("@discordjs/builders").SlashCommandBuilder;
const data = require("../external/data.cjs");
const octo = require("../external/octo.cjs");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("createissue")
    .setDescription(
      "Creates a new issue with a specified repository or the repository set for the channel"
    )
    .addStringOption((option) =>
      option
        .setName("title")
        .setDescription("The title of the issue")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("body")
        .setDescription("The body of the issue")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("repo")
        .setDescription("The repository to create the issue for")
        .setRequired(false)
    ),
  async execute(interaction) {
    const repoOption = interaction.options.getString("repo");
    const title = interaction.options.getString("title");
    const body = interaction.options.getString("body");

    console.log("Channel name:", interaction.channel.name);

    // remove the space from the channel name
    const channelName = interaction.channel.name;

    let repo;
    if (!repoOption) {
      repo = await data.getRepo(channelName);
      console.log("Repo from channel: ", repo);
    } else {
      repo = repoOption;
    }

    if (!repo) {
      await interaction.reply({
        content:
          "No repository has been set for this channel. Please set one using `/setrepo` or specify one using the `repo` option.",
        ephemeral: true,
      });
      return;
    }

    const octokit = octo.getOctokit();
    const issue = await octokit.rest.issues
      .create({
        owner: "CodeSteel",
        repo: repo,
        title: title,
        body: body,
      })
      .catch(async (error) => {
        console.error(error);
        await interaction.reply({
          content: "There was an error while creating the issue!",
          ephemeral: true,
        });
        return;
      });

    await interaction.reply({
      content:
        "Issue `" +
        issue.data.title +
        "` has been created in repository `" +
        repo +
        "`",
      ephemeral: true,
    });
  },
};

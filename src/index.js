import { initializeJobs } from "./external/jobs.js";
import { initializeBot, sendMessage } from "./external/discord.js";
import { initializeServer } from "./external/server.js";

initializeJobs();
initializeBot();
initializeServer();

//* testing grounds

// .setTitle(issue.id)
// // set author
// .setAuthor(
//   new EmbedBuilder.Author()
//     .setName(issue.user.name)
//     .setUrl(issue.user.url)
//     .setIconURL(issue.user.avatar)
// )
// .setColor(0x00ae86)
// .setDescription(issue.description)
// .setURL(issue.url);

// setInterval(() => {
//   sendMessage("boom", {
//     number: 37,
//     user: {
//       name: "CodeSteel",
//       url: "https://github.com/CodeSteel",
//       avatar: "https://avatars.githubusercontent.com/u/48765827?v=4",
//     },
//     description: "better permissions 😎",
//     url: "https://github.com/CodeSteel/TheBakery/issues/37",
//     action: "opened",
//   });
// }, 1500);

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
//   sendMessage("flux-shadow", {
//     id: "502",
//     user: {
//       name: "Steel",
//       url: "https://github.com/CodeSteel",
//       avatar: "https://github.com/CodeSteel.png",
//     },
//     description: "This is a test issue",
//     url: "https://github.com/CreateInc/flux-shadow/issues/502",
//   });
// }, 1500);

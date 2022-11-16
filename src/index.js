import { initializeBot } from "./external/discord.js";
import { initializeServer } from "./external/server.js";

initializeBot();
initializeServer();

//* Testing Grounds */

// setInterval(() => {
//   sendMessage("thebakery", {
//     number: 37,
//     user: {
//       name: "CodeSteel",
//       url: "https://github.com/CodeSteel",
//       avatar: "https://avatars.githubusercontent.com/u/48765827?v=4",
//     },
//     title: "feat: get new things on board 😎",
//     description:
//       "This is a test issue. This is a test issue. This is a test issue. This is a test issue. This is a test issue. This is a test issue. This is a test issue.",
//     url: "https://github.com/CodeSteel/TheBakery/issues/37",
//     action: "closed",
//   });
// }, 2000);

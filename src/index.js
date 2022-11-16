import { initializeJobs } from "./external/jobs.js";
import { initializeBot, sendMessage } from "./external/discord.js";
import { initializeServer } from "./external/server.js";

initializeJobs();
initializeBot();
initializeServer();

//* testing grounds

// setInterval(() => {
//   sendMessage(
//     "1039963542473941073",
//     "Test Issue",
//     "New issue found!",
//     "https://github.com/CodeSteel/TheBakery/issues/3"
//   );
// }, 1500);

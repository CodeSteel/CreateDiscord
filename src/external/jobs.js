import { getOctokit } from "./octo.js";
import { sendMessage } from "./discord.js";
import { CronJob } from "cron";
import Config from "../config.js";

const octo = getOctokit();

export const initializeJobs = () => {
  console.log("Initializing jobs");

  if (!octo) {
    setInterval(() => {
      console.log("Octokit was not ready yet, retrying...");
      initializeJobs();
      return;
    }, 5000);
  }

  // const issuesJob = new CronJob(
  //   Config.jobTimeout,
  //   getAllIssues,
  //   null,
  //   true,
  //   "America/Los_Angeles"
  // );
  // issuesJob.start();
};

// listen

// const getIssuesFromRepo = async (repo) => {
//   const channel = repo.channel;

//   const { data } = await octo.issues.listForRepo({
//     owner: repo.owner,
//     repo: repo.repo,
//   });

//   if (data.length === 0) {
//     return;
//   }

//   // do we already have these issues?
//   const newIssues = await data.filter((issue) => {
//     return !globalIssues.find((i) => i.data.id === issue.id);
//   });

//   if (newIssues.length === 0) {
//     return;
//   }

//   // find object with channel and add issues to it
//   const found = globalIssues.find((i) => i.channel === channel);
//   let firstRun = false;

//   if (found) {
//     found.data = found.data.concat(newIssues);
//   } else {
//     firstRun = true;
//     globalIssues.push({
//       data: newIssues,
//       channel: channel,
//     });
//   }

//   if (firstRun) {
//     return;
//   }

//   for (const issue of newIssues) {
//     sendMessage(channel, issue.title, issue.body, issue.html_url);
//   }
// };

// const getAllIssues = async () => {
//   const reposToFollow = Config.followIssueFromRepos;

//   for (const repo of reposToFollow) {
//     await getIssuesFromRepo(repo);
//   }
// };

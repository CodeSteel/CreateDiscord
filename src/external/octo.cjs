const Octokit = require("@octokit/rest");

const octokit = new Octokit.Octokit({
  auth: process.env.GITHUB_TOKEN,
  userAgent: "create v1.0.0",
});

const getOctokit = () => octokit;
module.exports = { getOctokit };

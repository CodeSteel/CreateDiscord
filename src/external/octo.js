import { Octokit } from "@octokit/rest";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
  userAgent: "create v1.0.0",
});

export const getOctokit = () => octokit;

import express from "express";
import GithubWebHook from "express-github-webhook";

// import dotenv
import * as dotenv from "dotenv";
dotenv.config();

const webhookHandler = GithubWebHook({
  path: "/webhook",
  secret: process.env.HOOK_SECRET,
});
import bodyParser from "body-parser";
import { sendMessage } from "./discord.js";
import pkg from "./data.cjs";
const { getChannel } = pkg;

let app;

export function initializeServer() {
  console.log("Initializing server");

  app = express();
  app.use(bodyParser.json());
  app.use(webhookHandler);

  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  webhookHandler.on("*", function (event, repo, data) {
    getChannel(repo).then((channel) => {
      if (!channel) {
        console.error(`No channel found for ${repo}`);
        return;
      }

      let issueChannel = channel.channel;
      issueChannel = issueChannel.toString();

      if (!issueChannel) {
        return;
      }

      sendMessage(issueChannel, {
        number: data.issue.number,
        user: {
          name: data.issue.user.login,
          url: data.issue.user.html_url,
          avatar: data.issue.user.avatar_url,
        },
        title: data.issue.title,
        description: data.issue.body,
        url: data.issue.html_url,
        action: data.action,
      });
    });
  });

  app.listen(3000, () => {
    console.log("Server listening on port 3000!");
  });
}

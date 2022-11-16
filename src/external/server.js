import express from "express";
import GithubWebHook from "express-github-webhook";
const webhookHandler = GithubWebHook({
  path: "/webhook",
  secret: "githubsecret",
});
import bodyParser from "body-parser";

let app;

export function initializeServer() {
  console.log("Initializing server");

  app = express();
  app.use(bodyParser.json());
  app.use(webhookHandler);

  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  webhookHandler.on("event", function (event, repo, data) {
    console.log(event, repo, data);

    // sendMessage(repo, {
    //   id: data.issue.number,
    //   user: {
    //     name: data.issue.user.login,
    //     url: `https://github.com/${data.issue.user.login}`,
    //     avatar: `https://github.com/${data.issue.user.login}.png`,
    //   },
    //   description: data.issue.title,
    //   url: data.issue.html_url,
    // });
  });

  app.listen(3000, () => {
    console.log("Server listening on port 3000!");
  });
}

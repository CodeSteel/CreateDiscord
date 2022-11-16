const JSONdb = require("simple-json-db");
const db = new JSONdb("./db.json");

function setRepo(channel, repo) {
  db.set(channel, repo);
}

async function getRepo(channel) {
  const json = await db.JSON();

  // find the repo that has a object with  channel: channel
  const repo = Object.keys(json).find((key) => json[key].channel === channel);

  return repo;
}

async function getChannel(repo) {
  return await db.get(repo);
}

module.exports = {
  setRepo,
  getRepo,
  getChannel,
};

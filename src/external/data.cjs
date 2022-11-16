const JSONdb = require("simple-json-db");
const db = new JSONdb("./db.json");

function setRepo(channel, repo) {
  db.set(channel, repo);
}

async function getRepo(channel) {
  const json = await db.JSON();
  const repo = Object.keys(json).find((key) => json[key].channel === channel);
  return repo;
}

async function getAllRepo() {
  const json = await db.JSON();
  return Object.keys(json);
}

async function getChannel(repo) {
  return await db.get(repo);
}

module.exports = {
  setRepo,
  getRepo,
  getChannel,
  getAllRepo,
};

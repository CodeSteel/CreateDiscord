const JSONdb = require("simple-json-db");
const db = new JSONdb("./db.json");

function setRepo(channel, repo) {
  db.set(channel, repo);
}

function getRepo(channel) {
  return db.get(channel);
}

module.exports = {
  setRepo,
  getRepo,
};

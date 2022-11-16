import JSONdb from "simple-json-db";
const db = new JSONdb("./../../db.json");

// repo:
//  channel
//  webhook
export function setRepo(channel, repo) {
  db.set(channel, repo);
}

export function getRepo(channel) {
  return db.get(channel);
}

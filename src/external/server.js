import express from "express";

let app;

export function initializeServer() {
  console.log("Initializing server");

  app = express();

  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  app.listen(3000, () => {
    console.log("Server listening on port 3000!");
  });
}

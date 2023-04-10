import axios from "axios";

export const GetServerData = (callback) => {
  axios
    .get("https://gameserveranalytics.com/api/v1/servers/583/stats", {
      headers: {
        "X-API-KEY": process.env.GSA_KEY,
      },
    })
    .then((res) => {
      const players = res.data[1].players + "/" + "56";
      callback(players);
    })
    .catch((error) => {
      console.error(error);
      callback("");
    });
};

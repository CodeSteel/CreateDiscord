# Create. Discord

### Create, Inc's Discord Bot

## Running the bot

1. Pass the required environment variables in a new `.env` file.
2. Run `yarn` or `npm i` to install the necessary packages.
3. Run `yarn start` or `npm start` to start the application.

## Adding the bot

1. [Click me!](https://discord.com/api/oauth2/authorize?client_id=1039976402608459898&permissions=8&scope=bot)

## How to use

1. Go to your repository settings and create a new webhook with this payload URL `http://147.135.113.126:3000/webhook`
2. The secret is `githubsecret`. _or just change it_
3. Go to discord and type `/setrepo` in your chanel of choice.

Congradulations, now whenever an issue from that repo is `opened`, `closed`, or `reopened` it will be sent to that channel as an embed. 🎉

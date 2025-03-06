const { Client, Events, GatewayIntentBits } = require('discord.js');

const { token } = require('./config.json');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, client => {
	console.log(`ログインしました！`);
});

//ログイン
client.login(token);
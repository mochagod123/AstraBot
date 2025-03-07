const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('about')
		.setDescription('Botの情報を見ます。'),
	execute: async function(interaction) {
		await interaction.reply('Test.');
	},
};
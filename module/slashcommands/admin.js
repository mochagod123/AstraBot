const { SlashCommandBuilder } = require('discord.js');
const fs = require("fs");
const path = require("path");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('admin')
        .setDescription('管理者専用コマンドです。')
        .addSubcommand(subcommand =>
            subcommand
                .setName('test')
                .setDescription('テスト用コマンドです。')),
    
    async execute(interaction) {
        const subcommandName = interaction.options.getSubcommand();
        const subcommandPath = path.join(__dirname, "admin", `${subcommandName}.js`);

        if (fs.existsSync(subcommandPath)) {
            const subcommand = require(subcommandPath);
            subcommand.execute(interaction);
        } else {
            await interaction.reply("無効なサブコマンドです！");
        }
    }
};

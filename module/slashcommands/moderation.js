const { SlashCommandBuilder } = require('discord.js');
const fs = require("fs");
const path = require("path");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('moderation')
        .setDescription('モデレーション用コマンドです。')
        .addSubcommand(subcommand =>
            subcommand
                .setName('ban')
                .setDescription('メンバーをBANします。')
                .addUserOption(option => option.setName('ユーザー').setDescription('ユーザーを選択').setRequired(true))
                .addStringOption(option => option.setName('理由').setDescription('禁止する理由'))
        ).addSubcommand(subcommand =>
            subcommand
                .setName('kick')
                .setDescription('メンバーをKickします。')
                .addUserOption(option => option.setName('メンバー').setDescription('Kickするメンバー').setRequired(true))
        ),
    
    async execute(interaction) {
        const subcommandName = interaction.options.getSubcommand();
        const subcommandPath = path.join(__dirname, "moderation", `${subcommandName}.js`);

        if (fs.existsSync(subcommandPath)) {
            const subcommand = require(subcommandPath);
            subcommand.execute(interaction);
        } else {
            await interaction.reply("無効なサブコマンドです！");
        }
    }
};
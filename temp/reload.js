const { SlashCommandBuilder, MessageFlags } = require('discord.js');
const fs = require("fs");
const path = require("path");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('reload')
		.setDescription('Botを再起動します。'),
	execute: async function(interaction) {
        try {
            const commandsPath = path.join(__dirname, 'module', 'slashcommands');
            const files = await fs.readdir(commandsPath); // 非同期でディレクトリを読み込む
        
            // キャッシュの削除
            for (const file of files) {
                const filePath = path.join(commandsPath, file);
                delete require.cache[require.resolve(filePath)];
            }
        
            const reloadedCommands = [];
            for (const file of files) {
                const filePath = path.join(commandsPath, file);
                try {
                    const command = require(filePath);
                    reloadedCommands.push(command);
                } catch (error) {
                    console.error(`コマンドの読み込みに失敗しました: ${file}`, error);
                    await interaction.followUp({ content: `コマンドの読み込みに失敗しました: ${file}\n${error}`, flags: [MessageFlags.Ephemeral] }); //エラー内容を追記
                }
            }
        
            await interaction.reply({ content: 'スラッシュコマンドの再読み込みが完了しました。', flags: [MessageFlags.Ephemeral] });
        } catch (error) {
            console.error('スラッシュコマンドの再読み込み中にエラーが発生しました:', error);
            await interaction.reply({ content: 'スラッシュコマンドの再読み込み中にエラーが発生しました。\n' + error, flags: [MessageFlags.Ephemeral] }); //エラー内容を追記
        }
	},
};
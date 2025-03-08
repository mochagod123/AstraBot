module.exports = {
    name: "test",
    async execute(interaction) {
        await interaction.reply("これはテスト用のサブコマンドです！");
    },
};
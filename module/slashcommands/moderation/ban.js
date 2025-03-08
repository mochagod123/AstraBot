const { EmbedBuilder, Colors, PermissionFlagsBits } = require('discord.js');

module.exports = {
    name: "ban",
    async execute(interaction) {
        const user = interaction.options.getUser("ユーザー")
        const reasons = interaction.options.getString('理由') || 'None';

        const embed = new EmbedBuilder()
          .setTitle('エラーが発生しました。')
          .setColor(Colors.Red)
          .setTimestamp()
          .setDescription("あなたの権限がありません。: BAN権限")

        if(!interaction.member.permissions.has(PermissionFlagsBits.BanMembers)) return await interaction.reply({
            embed: embed
        })

        const bot_embed = new EmbedBuilder()
            .setTitle('エラーが発生しました。')
            .setColor(Colors.Red)
            .setTimestamp()
            .setDescription("Botの権限がありません。: BAN権限")

        if(!interaction.guild.members.me.permissionsIn(interaction.channel).has(PermissionFlagsBits.BanMembers)) return await interaction.reply({
            embed: bot_embed
        })

        if(user.id === interaction.user.id) {
            const me_error = new EmbedBuilder()
            .setTitle('エラーが発生しました。')
            .setColor(Colors.Red)
            .setTimestamp()
            .setDescription("自分自身をBANすることはできません。")
            return await interaction.reply({embeds: [me_error]})
        }

        try {
            await interaction.guild.bans.create(user.id, { reason: reasons });
        } catch (e) {
            const errorembed = new EmbedBuilder()
            .setTitle('エラーが発生しました。')
            .setColor(Colors.Red)
            .setTimestamp()
            .setDescription("エラーコード:\n```" + `${e}` + "```")
            return await interaction.reply({embeds: [errorembed]})
        }
        

        const succ_embed = new EmbedBuilder()
          .setTitle('BANが完了しました。')
          .setColor(Colors.Green)
          .setTimestamp()

        await interaction.reply({embeds: [succ_embed]})
    },
};
const { EmbedBuilder, Colors, PermissionFlagsBits } = require('discord.js');

module.exports = {
    name: "kick",
    async execute(interaction) {
        const member = interaction.options.getUser("メンバー")
        const reasons = interaction.options.getString('理由') || 'None';

        const embed = new EmbedBuilder()
          .setTitle('エラーが発生しました。')
          .setColor(Colors.Red)
          .setTimestamp()
          .setDescription("あなたの権限がありません。: Kick権限")

        if(!interaction.member.permissions.has(PermissionFlagsBits.KickMembers)) return await interaction.reply({
            embeds: [embed]
        })

        const bot_embed = new EmbedBuilder()
            .setTitle('エラーが発生しました。')
            .setColor(Colors.Red)
            .setTimestamp()
            .setDescription("Botの権限がありません。: Kick権限")

        if(!interaction.guild.members.me.permissionsIn(interaction.channel).has(PermissionFlagsBits.KickMembers)) return await interaction.reply({
            embeds: [bot_embed]
        })

        if(member.id === interaction.user.id) {
            const me_error = new EmbedBuilder()
            .setTitle('エラーが発生しました。')
            .setColor(Colors.Red)
            .setTimestamp()
            .setDescription("自分自身をKickすることはできません。")
            return await interaction.reply({embeds: [me_error]})
        }

        try {
            const member_ = await interaction.guild.members.fetch(member.id);
            if (!member_) {
                const errorembed = new EmbedBuilder()
                .setTitle('エラーが発生しました。')
                .setColor(Colors.Red)
                .setTimestamp()
                .setDescription("メンバーが見つかりません")
                return await interaction.reply({embeds: [errorembed]})
            }
            await member_.kick({ reason: reasons });
        }
        catch (e) {
            const errorembed = new EmbedBuilder()
            .setTitle('エラーが発生しました。')
            .setColor(Colors.Red)
            .setTimestamp()
            .setDescription("エラーコード:\n```" + `${e}` + "```")
            return await interaction.reply({embeds: [errorembed]})
        }
        

        const succ_embed = new EmbedBuilder()
          .setTitle('Kickが完了しました。')
          .setColor(Colors.Green)
          .setTimestamp()

        await interaction.reply({embeds: [succ_embed]})
    },
};
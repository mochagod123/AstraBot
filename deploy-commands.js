const { REST, Routes } = require('discord.js');
const { clientId, token } = require('./config/config.json');
const fs = require('fs');

module.exports = async () => {
    const commands = [];
    const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
    
    for (const file of commandFiles) {
      const command = require(`./commands/${file}`);
      commands.push(command.data.toJSON());
    }
    
    const rest = new REST({ version: '10' }).setToken(token);
    
    (async () => {
      try {
        console.log('スラッシュコマンドを登録中...');
    
        await rest.put(
            Routes.applicationCommands(clientId),
            { body: commands },
        );
    
        console.log('スラッシュコマンドの登録完了！');
      } catch (error) {
        console.error(error);
      }
    })();
    
}
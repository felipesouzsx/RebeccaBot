const guildDB = require('../../database/guild.js');


module.exports.description = 'use isso pra eu me configurar!';
module.exports.staffCommand = true;
module.exports.options = {
  logchannel: {
    type: 'ChannelOption',
    description: 'canal de logs!',
    required: true
  }
}


module.exports.run = async (CLIENT, interaction) => {
  const GUILD = interaction.guild;
  //let logChannel = interaction.options['logchannel'].value;
  await guildDB.add(GUILD);
  interaction.reply('Added this guild to my database');
}
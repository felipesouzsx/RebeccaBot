const guildDB = require('../../database/guildDb.js');


module.exports.description = 'adiciona um canal pra eu ficar de olho';
module.exports.staffCommand = true;
module.exports.options = {
  channel: {
    type: 'ChannelOption',
    description: 'escolha um canal!',
    required: true
  }
}

module.exports.run = (CLIENT, interaction) => {
  let channelId = interaction.options.get('channel').value;
  interaction.reply(`Adding <#${channelId}> to watchlist`);
  guildDB.addChannelToWatchlist(interaction.guild.id, channelId);
}
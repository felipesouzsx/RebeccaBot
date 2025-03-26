const guildDB = require('../../database/guildDb.js');

module.exports.description = 'remove um canal da minha lista de vigia';
module.exports.staffCommand = true;
module.exports.options = {
  channel: {
    type: 'ChannelOption',
    description: 'escolha um canal!',
    required: true
  }
}

module.exports.run = async (CLIENT, interaction) => {
  let channel = interaction.options.get('channel').value;
  await guildDB.removeChannelFromWatchlist(interaction.guild.id, channel);
  interaction.reply(`Removed <#${channel}> from the watchlist`);
}
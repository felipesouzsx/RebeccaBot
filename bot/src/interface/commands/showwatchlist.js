const guildDB = require('../../database/guildDb.js');


module.exports.description = 'Lista os canais vigiados neste servidor';
module.exports.staffCommand = true;


module.exports.run = async (CLIENT, interaction) => {
  let watchlist = await guildDB.getWatchlist(interaction.guild.id);
  let reply = '';
  watchlist.forEach((channel) => {
    reply += `- <#${channel}>\n`;
  })
  interaction.reply(`This server's watchlist:\n${reply}`)
}
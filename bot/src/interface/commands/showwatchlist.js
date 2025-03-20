const DataBaseAccess = require('../../database/dbAccess.js');


module.exports.description = 'Lista os canais vigiados neste servidor';
module.exports.staffCommand = true;


module.exports.run = async (CLIENT, interaction) => {
  let watchlist = await DataBaseAccess.getWatchlist(interaction.guild.id);
}
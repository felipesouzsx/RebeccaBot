const DataBaseAccess = require('../../database/dbAccess.js'); 


module.exports.description = 'CAREFUL! This removes this guild from the database.';
module.exports.staffCommand = true;


module.exports.run = (CLIENT, interaction) => {
  DataBaseAccess.removeGuild(interaction.guild);
}

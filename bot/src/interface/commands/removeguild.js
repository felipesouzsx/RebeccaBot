const guildDB = require('../../database/guildDb.js');


module.exports.description = 'CAREFUL! This removes this guild from the database.';
module.exports.staffCommand = true;


module.exports.run = async (CLIENT, interaction) => {
  await guildDB.remove(interaction.guild.id);
  interaction.reply('Removed this Guild from my database.');
}

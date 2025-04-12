const guildDB = require('../../database/guildDb.js');


module.exports.description = 'use isso pra eu me configurar!';
module.exports.staffCommand = true;


module.exports.run = async (CLIENT, interaction) => {
  const GUILD = interaction.guild;
  await guildDB.add(GUILD);
  interaction.reply('Added this guild to my database');
}
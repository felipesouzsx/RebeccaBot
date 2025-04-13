const guildDB = require('../../database/guildDb.js');
const { getReply } = require('../../util/replyUtil.js');

const BYE_GIF = 'https://c.tenor.com/XDGYk0b-MLoAAAAC/tenor.gif';


module.exports.description = 'Tira esse servidor do banco de dados.';
module.exports.staffCommand = true;


module.exports.run = async (CLIENT, interaction) => {
  await guildDB.remove(interaction.guild.id);
  interaction.reply(getReply('Tirei este servidor do banco de dados, flws!', 1, BYE_GIF));
}

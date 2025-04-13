const guildDB = require('../../database/guildDb.js');
const { getReply } = require('../../util/replyUtil.js');


const SETUP_GIF = 'https://c.tenor.com/BI4UtVCDlyEAAAAd/tenor.gif';


module.exports.description = 'Comando que me configura!';
module.exports.staffCommand = true;


module.exports.run = async (CLIENT, interaction) => {
  const GUILD = interaction.guild;
  await guildDB.add(GUILD);
  interaction.reply(getReply('Tá tudo configurado tchum!', 1, SETUP_GIF));
}
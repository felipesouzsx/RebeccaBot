const { getReply } = require('../../util/replyUtil.js');
const POKE_GIF = 'https://c.tenor.com/eyFCzr957NsAAAAd/tenor.gif';

module.exports.description = 'Me cutuca. Não gosto desse troço mas é necessário pra caso eu esteja morta ;p';

module.exports.run = (CLIENT, interaction) => {
   interaction.reply(getReply('Eae, eu sou a Rebecca ;)', 1, POKE_GIF));
}
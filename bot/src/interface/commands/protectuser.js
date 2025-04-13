const userDb = require('../../database/userDb.js');
const { getReply } = require('../../util/replyUtil.js');


module.exports.description = 'Proteje um usuário de ser expulso por inatividade.';
module.exports.staffCommand = true;
module.exports.options = {
  user: {
    type: 'UserOption',
    description: 'Escolha um usuário',
    required: true
  }
}


module.exports.run = async (CLIENT, interaction) => {
  let userId = interaction.options.get('user').value;
  let User = await userDb.get(interaction.guild.id, userId);
  User.protected = true;
  await userDb.edit(interaction.guild.id, userId, User);
  interaction.reply(getReply(`${User.username} agora está protegido`));
}
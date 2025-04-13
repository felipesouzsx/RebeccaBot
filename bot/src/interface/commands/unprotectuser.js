const userDb = require('../../database/userDb.js');
const { getReply } = require('../../util/replyUtil.js');


module.exports.description = 'Tira a proteção de um usuário.';
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
  User.protected = false;
  await userDb.edit(interaction.guild.id, userId, User);
  interaction.reply(getReply(`${User.username} não está mais protegido.`));
}
const userDb = require('../../database/userDb.js');
const { getReply, getCommandFailReply } = require('../../util/replyUtil.js');


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
  let user;

  try {
    user = await userDb.get(interaction.guild.id, userId);
  } catch(error) {
    console.log(error);
    interaction.reply(getCommandFailReply());
    return;
  }

  user.protected = true;

  try {
    await userDb.edit(interaction.guild.id, user);
  } catch(error) {
    console.log(error);
    interaction.reply(getCommandFailReply());
    return;
  }
  interaction.reply(getReply(`${user.username} agora está protegido`));
}
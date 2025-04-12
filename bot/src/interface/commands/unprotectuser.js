const userDb = require('../../database/userDb.js');


module.exports.description = 'proteje um usuário de ser expulso por inatividade';
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
  interaction.reply(`${User.username} is no longer protected`);
}
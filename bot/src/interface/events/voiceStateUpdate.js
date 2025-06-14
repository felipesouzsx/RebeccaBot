const updateUserTimestamp = require('../../controller/updateUserTimestamp.js');


module.exports = async (CLIENT, ...args) => {
  const new_state = args[1];
  const guild = new_state.guild;
  const userData = new_state.member.user;

  let guildId = guild.id;
  let userId = userData.id;

  if (userData.bot) { return }

  updateUserTimestamp(guildId, userId);
}
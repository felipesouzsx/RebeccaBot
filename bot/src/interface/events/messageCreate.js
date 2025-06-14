const updateUserTimestamp = require('../../controller/updateUserTimestamp.js');


module.exports = async (CLIENT, ...args) => {
  const message = args[0];
  if (message.author.bot) { return }

  let guildId = message.guildId;
  let userId = message.author.id;

  updateUserTimestamp(guildId, userId);
}
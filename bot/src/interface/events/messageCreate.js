const userDB = require('../../database/userDb.js');
const timeUtil = require('../../util/timeUtil.js');


module.exports = async (CLIENT, ...args) => {
  const message = args[0];
  if (message.author.bot) { return }

  const NOW = timeUtil.getCurrentTimestamp();
  let User;

  try {
    User = await userDB.get(message.guildId, message.author.id);
  } catch (error) {
    console.log(`MSG_CRT: Error when fetching user: ${error}`);
    return;
  }

  User.lastMessageTimestamp = NOW;
  
  try {
    await userDB.edit(message.guildId, User);
  } catch(error) {
    console.log(error);
  }
}
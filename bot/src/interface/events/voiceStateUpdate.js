const { getCurrentTimestamp } = require('../../util/timeUtil.js');
const userDB = require('../../database/userDb.js');


module.exports = async (CLIENT, ...args) => {
  const NEW_STATE = args[1];
  const GUILD = NEW_STATE.guild;
  const USER_DATA = GUILD.members.cache.get(NEW_STATE.id).user;
  const NOW = getCurrentTimestamp();

  if (USER_DATA.bot) { return }

  try {
    const USER = userDB.get(GUILD.id, USER.id);
  } catch (error) {
    console.log(`MSG_CRT: Error when fetching user: ${error}`);
    return;
  }

  USER.lastMessageTimestamp = NOW;

  try {
    await userDB.edit(NEW_STATE.guild.id, USER);
  } catch (error) {
    console.log(error);
  }
}
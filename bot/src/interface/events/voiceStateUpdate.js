const { getCurrentTimestamp } = require('../../util/timeUtil.js');
const { User } = require('../../util/discordUtil.js');
const userDB = require('../../database/userDb.js');


module.exports = async (CLIENT, ...args) => {
  const NEW_STATE = args[1];
  const USER = NEW_STATE.guild.members.cache.get(NEW_STATE.id).user;

  if (USER.bot) { return }

  const nowTimestamp = getCurrentTimestamp();
  const userData = new User(USER.username, nowTimestamp);
  try {
    await userDB.edit(NEW_STATE.guild.id, NEW_STATE.id, userData);
  } catch (error) {
    console.log(error);
  }
}
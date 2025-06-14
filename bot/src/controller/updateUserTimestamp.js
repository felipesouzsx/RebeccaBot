const userDB = require('../database/userDb.js');
const timeUtil = require('../util/timeUtil.js');


module.exports = async (guildId, userId) => {
  const NOW = timeUtil.getCurrentTimestamp();
  let User;

  try {
    User = await userDB.get(guildId, userId);
  } catch (error) {
    console.log(`UPD_USR: Error when fetching user: ${error}`);
    return;
  }

  User.lastMessageTimestamp = NOW;

  try {
    await userDB.edit(guildId, User);
  } catch(error) {
    console.log(error);
  }
}
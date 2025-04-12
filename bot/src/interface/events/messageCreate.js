const userDB = require('../../database/userDb.js');
const guildDB = require('../../database/guildDb.js');
const timeUtil = require('../../util/timeUtil.js');
const { User } = require('../../util/discordUtil.js');


module.exports = async (CLIENT, ...args) => {
  const message = args[0];
  if (message.author.bot) { return }

  const nowTimestamp = timeUtil.getCurrentTimestamp();
  const user = new User(message.author.username, nowTimestamp);
  userDB.edit(message.guildId, message.author.id, user);
}
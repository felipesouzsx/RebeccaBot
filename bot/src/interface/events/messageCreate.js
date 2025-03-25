const DataBaseAccess = require('../../database/dbAccess.js');
const guildDB = require('../../database/guild.js');
const timeUtil = require('../../util/timeUtil.js');
const { User } = require('../../util/discordUtil.js');


module.exports = async (CLIENT, ...args) => {
  const message = args[0];
  if (message.author.bot) { return }

  const guildWatchlist = await guildDB.getWatchlist(message.guildId);
  if (!guildWatchlist.includes(message.channelId)) { return }

  const nowTimestamp = timeUtil.getCurrentTimestamp();
  const user = new User(message.author.username, nowTimestamp);
  DataBaseAccess.editUser(message.guildId, message.author.id, user);
}
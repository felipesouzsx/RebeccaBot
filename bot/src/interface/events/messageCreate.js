const DataBaseAccess = require('../../database/dbAccess.js');
const timeUtil = require('../../util/timeUtil.js');


module.exports = async (CLIENT, ...args) => {
  const message = args[0];
  if (message.author.bot) { return }
  const guildWatchlist = await DataBaseAccess.getWatchlist(message.guildId);

  if (!guildWatchlist.includes(message.channelId)) { return }

  const nowTimestamp = timeUtil.getCurrentTimestamp();
  const user = new DataBaseAccess.User(message.author.username, nowTimestamp);
  DataBaseAccess.editUser(message.guildId, message.author.id, user);

  console.log(`${message.author.username} says "${message.content}"`); 
}
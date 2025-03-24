const { User } = require('../database/dbAccess.js');


// gets Members from the Discord API, not from the Database.
async function getGuildMembers(GUILD) {
  let members = GUILD.members;
  let result = {}
  members.cache.each(async (guildMember) => {
    if (guildMember.user.bot) { return; }
    let username = guildMember.user.username;
    let lastMessageTimestamp = Math.floor(Date.now() / 1000);
    let userData = new User(username, lastMessageTimestamp);
    result[guildMember.user.id] = userData.getJson();
  });
  return result;
}


module.exports = {
  getGuildMembers
}
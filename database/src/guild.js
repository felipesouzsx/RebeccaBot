const { db } = require('./db.js');


async function getGuild(guildId) {
  const guildUsersCollection = await db.collection('guilds').doc(guildId);
  return guildUsersCollection;
}


async function getGuildUsers(guildId) {
  let guild = await getGuild(guildId);
  let guildUsers = await guild.collection('users');
  let usersCollection = await guildUsers.get();
  let result = {};
  usersCollection.forEach((userDocument) => {
    result[userDocument.id] = userDocument.data(); // User JSON data
  });
  return result;
}


module.exports = { getGuild, getGuildUsers }
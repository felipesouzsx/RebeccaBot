const { db } = require('./db.js');


async function get(guildId) {
  const guildUsersCollection = await db.collection('guilds').doc(guildId);
  return guildUsersCollection;
}

async function getUsers(guildId) {
  let guild = await get(guildId);
  let guildUsers = await guild.collection('users');
  let usersCollection = await guildUsers.get();
  let result = {};
  usersCollection.forEach((userDocument) => {
    result[userDocument.id] = userDocument.data(); // User JSON data
  });
  return result;
}

async function remove(guildId, userId) {
  // todo: fail to write -> please mouse over recursiveDelete and scroll down
  let guild = await get(guildId);
  let response = await db.recursiveDelete(guild).then(
    (response) => {
      console.log(response);
    }
  );
}


module.exports = { get, getUsers, remove }
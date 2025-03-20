const { db } = require('./db.js');
const admin = require('firebase-admin');


async function get(guildId) {
  const guildDocument = await db.collection('guilds').doc(guildId);
  return guildDocument;
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


async function add(guildId, users) {
  let guild = await get(guildId);
  await guild.set({'watchlist': []});
  console.log(`ADD_GLD: ${guildId} = ${JSON.stringify(users)}`);
}


async function remove(guildId) {
  // todo: fail to write -> please mouse over recursiveDelete and scroll down
  let guild = await get(guildId);
  await db.recursiveDelete(guild).then(
    (response) => {
      console.log(response);
    }
  );
}

async function addChannelToWatchlist(guildId, channelId) {
  let guild = await get(guildId);
  await guild.update({
    watchlist: admin.firestore.FieldValue.arrayUnion(channelId) // Append to array field
  });
  console.log(`ADD_CHL: ${channelId}`);
}

async function getWatchlist(guildId) {
  let guild = await get(guildId);
  let settingsCollection = await guild.get();
  let watchlist = settingsCollection.data().watchlist;
  return watchlist;
}


module.exports = { 
  get, add, remove, getUsers, 
  addChannelToWatchlist, getWatchlist
}
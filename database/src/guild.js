const { db } = require('./db.js');
const admin = require('firebase-admin');


var cache = {}

// please optimize READS ON THE DB. PLEASE FELIPE PLEASE.
//                                          - past felipe
async function get(guildId) {
  if (guildId in cache) { return cache[guildId] };

  const guildDocument = await db.collection('guilds').doc(guildId);
  cache[guildId] = guildDocument;
  return guildDocument;
}

async function getUsers(guildId) {
  let guild = await get(guildId);
  let guildUsers = await guild.collection('users').data().users;
  return guildUsers;
}


async function add(guildId, users) {
  let guild = await get(guildId);
  let guildUsers = guild.collection('users');
  await guild.set({'watchlist': []});
  await guild.set({'users': users});
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
}

async function removeChannelFromWatchlist(guildId, channelId) {
  let guild = await get(guildId);
  await guild.update({
    watchlist: admin.firestore.FieldValue.arrayRemove(channelId)
  });
}

async function getWatchlist(guildId) {
  let guild = await get(guildId);
  let settingsCollection = await guild.get();
  let watchlist = settingsCollection.data().watchlist;
  return watchlist;
}


module.exports = { 
  get, add, remove, getUsers, 
  addChannelToWatchlist, removeChannelFromWatchlist, getWatchlist
}
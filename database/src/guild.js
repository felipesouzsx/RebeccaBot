const { db } = require('./db.js');
const admin = require('firebase-admin');


async function get(guildId) {
  const guildDocument = await db.collection('guilds').doc(guildId);
  cache[guildId] = {
    timestamp: Math.floor(Date.now() / 1000), // to unix timestamp
    doc: guildDocument
  }
  return guildDocument;
}


async function getUsers(guildId) {
  let guild = await get(guildId);
  let guildDocument = await guild.get();
  return guildDocument.data().users;
}


async function add(guildId, users) {
  let guild = await get(guildId);
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
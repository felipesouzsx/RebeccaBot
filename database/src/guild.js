const { db } = require('./db.js');
const admin = require('firebase-admin');


async function get(guildId) {
  const guildDocument = await db.collection('guilds').doc(guildId);
  return guildDocument;
}


async function getAll() {
  const guildCollection = await db.collection('guilds');
  const guilds = await guildCollection.get()
  const guildIds = guilds.docs.map((value) => { return value.id })
  return guildIds;
}


async function getUsers(guildId) {
  let guild = await get(guildId);
  let guildDocument = await guild.get();
  return guildDocument.exists ? guildDocument.data().users : undefined;
}


async function add(guildId, users) {
  let guild = await get(guildId);
  let status = 200; // 200 OK
  await Promise.all([
    guild.set({'watchlist': []}),
    guild.set({'users': users})
  ]).catch(error => status = 500);
  return status;
}


async function remove(guildId) {
  let status = 204; // 204 DELETED
  let guild = await get(guildId);

  await db.recursiveDelete(guild)
    .then(response => console.log(response))
    .catch(error => status = 500);
  return status;
}


module.exports = { 
  get, getAll, add, remove, getUsers
}
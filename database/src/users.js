const Guild = require('./guild.js');
const admin = require('firebase-admin');


async function getGuildUsers(guildId) {
  let guildDocument = await Guild.get(guildId);
  let documentData = await guildDocument.get();
  return documentData.data().users;
}


async function add(guildId, userId, userData) {
  let guild = await Guild.get(guildId);
  await guild.update({
    [`users.${userId}`]: userData // Javascript sorcery to use template string as key
  })
}


async function remove(guildId, userId) {
  let guild = await Guild.get(guildId);
  await guild.update({
    [`users.${userId}`]: admin.firestore.FieldValue.delete() // Javascript sorcery to use template string as key
  })
}


async function edit(guildId, userId, data) {
  let guild = await Guild.get(guildId);
  await guild.update({
    [`users.${userId}`]: data
  })
}


async function get(guildId, userId) {
  let guildUsers = await getGuildUsers(guildId);
  return guildUsers[userId];
}


module.exports = { add, remove, edit, get }
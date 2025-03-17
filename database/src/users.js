const Guild = require('./guild.js');


async function getGuildUsers(guildId) {
  let guild = await Guild.get(guildId);
  let guildUsers = await guild.collection('users');
  return guildUsers;
}

async function add(guildId, userId, userData) {
  let guildUsers = await getGuildUsers(guildId);
  let document = guildUsers.doc(userId);
  await document.set(userData);
  console.log(`ADD_USR: ${userId} = ${JSON.stringify(userData)}`);
}

async function remove(guildId, userId) {
  let guildUsers = await getGuildUsers(guildId);
  let response = await guildUsers.doc(userId).delete();
  console.log(`RMV_USR: ${userId}`);
}

async function edit(guildId, userId, data) {
  let guildUsers = await getGuildUsers(guildId);
  let document = await guildUsers.doc(userId);
  let response = document.update(data);
  console.log(`EDT_USR: ${userId} = ${JSON.stringify(data)}`);
}

async function get(guildId, userId) {
  let guildUsers = await getGuildUsers(guildId);
  let documentRef = await guildUsers.doc(userId);
  let document = await documentRef.get();
  if (!document.exists) {
    return { error: 404 };
  }
  return document.data();
}


module.exports = { add, remove, edit, get }
const { getGuild } = require('./guild.js');


async function addUser(guildId, userId, userData) {
  let guild = await getGuild(guildId);
  let guildUsers = await guild.collection('users');
  let document = guildUsers.doc(userId);
  await document.set(userData);
  console.log(`ADD_USR: ${userId} = ${JSON.stringify(userData)}`);
}

async function removeUser(guildId, userId) {
  let guild = await getGuild(guildId);
  let guildUsers = await guild.collection('users');
  let response = await guildUsers.doc(userId).delete();
  console.log(`RMV_USR: ${userId}`);
}

async function editUser(guildId, userId, data) {
  let guild = await getGuild(guildId);
  let guildUsers = await guild.collection('users');
  let document = await guildUsers.doc(userId);
  let response = document.update(data);
  console.log(`EDT_USR: ${userId} = ${JSON.stringify(data)}`);
}


module.exports = { addUser, removeUser, editUser }
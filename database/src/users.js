const Guild = require('./guild.js');
const admin = require('firebase-admin');


async function getGuildUsers(guildId) {
  let guildDocument = await Guild.get(guildId);
  let documentData = await guildDocument.get();
  return documentData.exists ? documentData.data().users : undefined;
}


async function add(guildId, userId, userData) {
  let guild = await Guild.get(guildId);
  let status = 201;
  await guild.update({[`users.${userId}`]: userData}) // JS sorcery to use template string as key
    .catch((reason) => status = 500);
  return status;
}


async function remove(guildId, userId) {
  let guild = await Guild.get(guildId);
  let status = 204;
  await guild.update({
    [`users.${userId}`]: admin.firestore.FieldValue.delete()
  }).catch(reason => { console.log(reason); status = 500 });
  return status;
}


async function edit(guildId, userId, data) {
  let guild = await Guild.get(guildId);
  let guildDocument = await guild.get();
  let status = 404;
  if (!guildDocument.exists) { return status }
  let user = await get(guildId, userId);
  if (user != undefined) {
    status = 200
    await guild.update({
      [`users.${userId}`]: data
    }).catch(reason => status = 500);
  }
  return status;
}


async function get(guildId, userId) {
  let guildUsers = await getGuildUsers(guildId);
  return guildUsers != undefined ? guildUsers[userId] : undefined;
}


module.exports = { add, remove, edit, get }
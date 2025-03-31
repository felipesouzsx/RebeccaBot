const dbAccess = require('./dbAccess.js');
const { User } = require('../util/discordUtil.js');



function printError(error) { console.log(`DBS_USR: Error ${error}`) }


async function add(guildId, userId, User) {
  try {
    let userJson = User.getJson();
    let stringData = JSON.stringify(userJson);
    dbAccess.fetchDatabase(`/guilds/${guildId}/users/${userId}`,'POST', stringData)
  } catch(error) { printError(error) }
}


async function edit(guildId, userId, User) {
  let userJson = User.getJson();
  let jsonData = JSON.stringify(userJson);
  try {
    dbAccess.fetchDatabase(`/guilds/${guildId}/users/${userId}`, 'PUT', jsonData);
  } catch(error) { printError(error) }
}


async function get(guildId, userId) {
  let result;
  let data = {};
  try {
    data = (await dbAccess.fetchDatabase(`/guilds/${guildId}/users/${userId}`)).data;
    result = new User(data.username, data.lastMessageTimestamp);
  } catch(error) { printError(error) }
  return result;
}


module.exports = { get, add, edit };
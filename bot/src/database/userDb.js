const dbAccess = require('./dbAccess.js');
const discordUtils = require('../util/discordUtil.js');



function printError(error) { console.log(`DBS_USR: Error ${error}`) }
function printResponse(response) { console.log(`DBS_USR: Response ${response.status}`) }


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


module.exports = { add, edit };
const dbAccess = require('./dbAccess.js');
const { User } = require('../util/discordUtil.js');



function getStatusError(status) {
  return `DBS_USR: Database returned with status ${status}`;
}



async function add(guildId, User) {
  let userJson = User.getJson();
  let stringData = JSON.stringify(userJson);
  let response = await dbAccess.fetchDatabase(`/guilds/${guildId}/users/${User.id}`,'POST', stringData);
  if (response.status != 201) { throw getStatusError(response.status) }
}


async function remove(guildId, userId) {
  let response = await dbAccess.fetchDatabase(`/guilds/${guildId}/users/${userId}`, 'DELETE');
  if (response.status != 204) { throw getStatusError(response.status) }
}


async function edit(guildId, User) {
  let userJson = User.getJson();
  let jsonData = JSON.stringify(userJson);
  console.log(userJson)
  let response = await dbAccess.fetchDatabase(`/guilds/${guildId}/users/${User.id}`, 'PUT', jsonData);
  if (response.status != 200) { throw getStatusError(response.status) }
}


async function get(guildId, userId) {
  let response = await dbAccess.fetchDatabase(
    `/guilds/${guildId}/users/${userId}`, 
    'GET',
    undefined,
    false
  );
  if (response.status != 200) { throw getStatusError(response.status) }
  response.data["id"] = userId
  let result = new User(response.data);
  return result;
}


module.exports = { get, add, remove, edit };
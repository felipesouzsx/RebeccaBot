const dbAccess = require('./dbAccess.js');
const discordUtils = require('../util/discordUtil.js');


function getStatusError(status) {
  return `DBS_GLD: Database returned with status ${status}`;
}


async function add(Guild) {
  const members = await discordUtils.getGuildMembers(Guild);
  const data = JSON.stringify(members);
  let response = await dbAccess.fetchDatabase(`/guilds/${Guild.id}`, 'POST', data);
  if (response.status != 201) { throw getStatusError(response.status) }
}


async function get(guildId) {
  let guildData = {};
  let response = await dbAccess.fetchDatabase(`/guilds/${guildId}`);
  if (response.status != 200) { throw getStatusError(response.status) }
  guildData = response.data;
  return guildData;
}


async function getAllGuilds() {
  let guilds = []
  let response = await dbAccess.fetchDatabase(`/guilds`);
  if (response.status != 200) { throw getStatusError(response.status) }
  guilds = response.data;
  return guilds;
}


async function getMembers(guildId) {
  let members = {};
  let response = await dbAccess.fetchDatabase(`/guilds/${guildId}/users`);
  if (response.status != 200) { throw getStatusError(response.status) }
  members = response.data;
  return members;
}


async function remove(guildId) {
  let response = await dbAccess.fetchDatabase(`/guilds/${guildId}`, 'DELETE');
  if (response.status != 204) { throw getStatusError(response.status) }
}




module.exports = { 
  add, remove, get, getAllGuilds,
  getMembers
}
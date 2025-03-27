const dbAccess = require('./dbAccess.js');
const discordUtils = require('../util/discordUtil.js');




async function add(Guild) {
  try {
    const members = await discordUtils.getGuildMembers(Guild);
    const data = JSON.stringify(members);
    dbAccess.fetchDatabase(`/guilds/${Guild.id}`, 'POST', data);
  } catch(error) { console.log(`ADD_GLD: Error ${error}`) }
}


async function get(guildId) {
  let guildData = {};
  try {
    guildData = (await dbAccess.fetchDatabase(`/guilds/${guildId}`)).data;
  } catch(error) { console.log(`GET_GLD: Error ${error}`) }
  return guildData;
}


async function getAllGuilds() {
  let guilds = []
  try {
    guilds = (await dbAccess.fetchDatabase(`/guilds`)).data;
  } catch(error) { console.log(`GET_GDS: Error ${error}`) }
  return guilds;
}


async function remove(guildId) {
  try {
    dbAccess.fetchDatabase(`/guilds/${guildId}`, 'DELETE');
  } catch(error) { 
    console.log(`RMV_GLD: Error ${error}`) 
  }
}


async function getWatchlist(guildId) {
  let watchlist = [];
  try {
    watchlist = (await dbAccess.fetchDatabase(`/guilds/${guildId}/watchlist`)).data;
  } catch(error) { console.log(`GET_LST: Error ${error} ${error.stack}`) }
  return watchlist;
}


async function addChannelToWatchlist(guildId, channelId) {
  try {
    let data = JSON.stringify({'channelId': channelId});
    dbAccess.fetchDatabase(`/guilds/${guildId}/watchlist/${channelId}`, 'POST', data);
  } catch(error) { console.log(`ADD_LST: Error ${error}`) }
}


async function removeChannelFromWatchlist(guildId, channelId) {
  try {
    dbAccess.fetchDatabase(`/guilds/${guildId}/watchlist/${channelId}`, 'DELETE');
  } catch(error) { console.log(`RMV_CHL: Error ${error}`); }
}


async function getMembers(guildId) {
  let members = {};
  try {
    members = (await dbAccess.fetchDatabase(`/guilds/${guildId}/users`)).data;
  } catch(error) { console.log(`GET_MBR: Error ${error}${error.stack}`) }
  return members;
}




module.exports = { 
  add, remove, get, getAllGuilds,
  getWatchlist, addChannelToWatchlist, removeChannelFromWatchlist,
  getMembers
}
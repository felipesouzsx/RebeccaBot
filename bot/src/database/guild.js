const dbAccess = require('./dbAccess.js');
const discordUtils = require('../util/discordUtil.js');




async function add(Guild) {
  try {
    const members = await discordUtils.getGuildMembers(Guild);
    const data = JSON.stringify(members);
    await dbAccess.fetchDatabase(`/guilds/${Guild.id}`, 'POST', data)
    .then(async (response) => {
      if (!response.ok) { console.log(`ADD_GLD: Error ${error}`); return }
      console.log(`ADD_GLD: ${Guild.id} : ${data}`);
    });
  } catch(error) { console.log(`ADD_GLD: Error ${error}`) }
}


async function remove(guildId) {
  try {
    await dbAccess.fetchDatabase(`/guilds/${guildId}`, 'DELETE')
    .then(async (response) => {
      if (!response.ok) { console.log(`RMV_GLD: Error ${error}`); return }
      console.log(`RMV_GLD: ${guildId}`);
    });
  } catch(error) { console.log(`RMV_GLD: Error ${error}`) }
}


async function getWatchlist(guildId) {
  let watchlist = [];
  try {
    await dbAccess.fetchDatabase(`/guilds/${guildId}/watchlist`)
    .then(async (response) => {
      if (!response.ok) { console.log(`GET_LST: Error ${error}`); return; };
      watchlist = await response.json();
      console.log(`DBS_RES: ${watchlist}`);
    });
  } catch(error) { console.log(`GET_LST: Error ${error}`) }
  return watchlist;
}


async function addChannelToWatchlist(guildId, channelId) {
  try {
    let data = JSON.stringify({'channelId': channelId});
    await dbAccess.fetchDatabase(`/guilds/${guildId}/watchlist/${channelId}`, 'POST', data)
    .then(async (response) => {
      if (!response.ok) { console.log(`ADD_LST: Error ${error}`); return; };
      ;
    });
  } catch(error) { console.log(`ADD_LST: Error ${error}`) }
}


async function removeChannelFromWatchlist(guildId, channelId) {
  try {
    await dbAccess.fetchDatabase(`/guilds/${guildId}/watchlist/${channelId}`, 'DELETE')
    .then(async (response) => {
      if (!response.ok) { console.log(`RMV_CHL: Error ${response.status}`); return; };
      console.log(`RMV_CHL: ${response.status}`);
    });
  } catch(error) { console.log(`RMV_CHL: Error ${error}`); }
}

async function getMembers(guildId) {
  let members = {};
  try {
    await dbAccess.fetchDatabase(`/guilds/${guildId}/users`)
    .then(async (response) => {
      if (!response.ok) { console.log(`GET_MBR: Error ${response.status}`); return; };
      members = await response.json();
    });
  } catch(error) { console.log(`GET_MBR: Error ${error}`) }
  return members;
}




module.exports = { 
  add, remove, 
  getWatchlist, addChannelToWatchlist, removeChannelFromWatchlist,
  getMembers 
}
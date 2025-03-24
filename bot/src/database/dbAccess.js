require('dotenv').config();
const discordUtil = require('../util/discordUtil.js');



class User {
  constructor(username, lastMessageTimestamp) {
    this.username = username;
    this.lastMessageTimestamp = lastMessageTimestamp;
  }

  getJson() {
    return {
      username: this.username,
      lastMessageTimestamp: this.lastMessageTimestamp
    }
  }
}



function print_error(error) {
  console.log(`DBS_ERR: ${error}${error.stack != undefined ? `${error.stack}` : ''}`);
}

async function getGuildMembers(guildId) {
  let members = {};
  try {
    await fetchDatabase(`/guilds/${guildId}/users`).then(
      async (response) => {
        if (!response.ok) { print_error(response.status); return; };
        members = await response.json();
      }
    );
  } catch(error) { print_error(error); }
  return members;
}


async function fetchDatabase(url, method='GET', body=null) {
  let request = {
    method: method,
    headers: { 'Content-Type': 'application/json' },
  };
  if (body != null) {
    request.body = body;
  };
  let response = await fetch(`${process.env.DATABASE_URL}${url}`, request);
  return response;
}




async function addGuild(GUILD) {
  try {
    let members = await discordUtil.getGuildMembers(GUILD);
    let data = JSON.stringify(members);
    await fetchDatabase(`/guilds/${GUILD.id}`, 'POST', data)
    .then(async (response) => {
        if (!response.ok) { print_error(response.status); return; };
        console.log(`ADD_GLD: ${GUILD.id}`);
      }
    );
  } catch(error) { print_error(error); }
}


async function removeGuild(guildId) {
  try {
    await fetchDatabase(`/guilds/${guildId}`, 'DELETE').then(
      (response) => {
        console.log(`DBS_RSP: ${response.status}`);
      }
    );
  } catch(error) { print_error(error); }
}





async function getWatchlist(guildId) {
  let watchlist = [];
  try {
    await fetchDatabase(`/guilds/${guildId}/watchlist`).then(
      async (response) => {
        if (!response.ok) { print_error(response.status); return; };
        watchlist = await response.json();
        console.log(`DBS_RES: ${watchlist}`);
      }
    )
  } catch(error) { print_error(error); }
  return watchlist;
}


async function addChannelToWatchlist(guildId, channelId) {
  try {
    let data = JSON.stringify({'channelId': channelId});
    await fetchDatabase(`/guilds/${guildId}/watchlist/${channelId}`, 'POST', data)
    .then(async (response) => {
        if (!response.ok) { print_error(response.status); return; };
        console.log(`ADD_CHL: ${channelId}`);
      }
    );
  } catch(error) { print_error(error); }
}


async function removeChannelFromWatchlist(guildId, channelId) {
  try {
    await fetchDatabase(`/guilds/${guildId}/watchlist/${channelId}`, 'DELETE')
    .then(async (response) => {
        if (!response.ok) { print_error(response.status); return; };
        console.log(`RMV_CHL: ${response.status}`);
      }
    );
  } catch(error) { print_error(error); }
}




async function addUser(guildId, userId, user) {
  try {
    let userJson = user.getJson();
    let stringData = JSON.stringify(userJson);
    await fetchDatabase(`/guilds/${guildId}/users/${userId}`,'POST', stringData)
    .then((response) => {
      console.log(`ADD_USR: Added user ${userJson.username} to database`);
      console.log(`DBS_RSP: ${response.status}`);
    })
  } catch(error) { print_error(error); }
}


async function editUser(guildId, userId, user) {
  let userJson = user.getJson();
  let jsonData = JSON.stringify(userJson);
  try {
    await fetchDatabase(`/guilds/${guildId}/users/${userId}`, 'PUT', jsonData).then(
      (response) => {
        console.log(`DBS_RSP: ${response.status}`);
      }
    );
  } catch(error) { print_error(error); }
}


module.exports = { 
  getGuildMembers, removeGuild, addGuild,
  User, addUser, editUser, 
  addChannelToWatchlist, removeChannelFromWatchlist, getWatchlist
};
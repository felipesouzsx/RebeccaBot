require('dotenv').config();


function print_error(error) {
  console.log(`DBS_ERR: ${error}${error.stack != undefined ? `${error.stack}` : ''}`);
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


async function addGuild(guildId) {
  try {
    let data = JSON.stringify([]);
    await fetchDatabase(`/guilds/${guildId}`, 'POST', data)
    .then(async (response) => {
        if (!response.ok) { print_error(response.status); return; };
        console.log(`ADD_GLD: ${channelId}`);
      }
    );
  } catch(error) { print_error(error); }
}


async function addGuildMembers(GUILD) {
  let members = GUILD.members;

  members.cache.each(async (guildMember) => {
    if (guildMember.user.bot) { return; }
    let userData = {
      username: guildMember.user.username,
      lastMessageTimestamp: Math.floor(Date.now() / 1000) // Milliseconds to seconds(unix)
    };
    await addUser(GUILD.id, guildMember.user.id, userData);
  });
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


async function addUser(guildId, userId, data) {
  try {
    let stringData = JSON.stringify(data);
    await fetchDatabase(`/guilds/${guildId}/users/${userId}`,'POST', stringData)
    .then((response) => {
      console.log(`ADD_USR: Added user ${data.username} to database`);
      console.log(`DBS_RSP: ${response.status}`);
    })
  } catch(error) { print_error(error); }
}


async function editUser(guildId, userId, data) {
  let jsonData = JSON.stringify(data);
  try {
    await fetchDatabase(`/guilds/${guildId}/users/${userId}`, 'PUT', jsonData).then(
      (response) => {
        console.log(`DBS_RSP: ${response.status}`);
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


module.exports = { 
  addGuildMembers, getGuildMembers, removeGuild, addGuild,
  addUser, editUser, 
  addChannelToWatchlist, removeChannelFromWatchlist, getWatchlist
};
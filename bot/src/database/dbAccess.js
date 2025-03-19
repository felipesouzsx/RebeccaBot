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


async function getGuildMembers(GUILD) {
  let members = {};
  try {
    await fetchDatabase(`/guilds/${GUILD.id}/users`, 'GET').then(
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
    await fetchDatabase(
      `/guilds/${guildId}/users/${userId}`,
      'POST',
      JSON.stringify(data)
    ).then((response) => {
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


async function removeGuild(GUILD) {
  try {
    await fetchDatabase(`/guilds/${GUILD.id}`, 'DELETE').then(
      (response) => {
        console.log(`DBS_RSP: ${response.status}`);
      }
    );
  } catch(error) { print_error(error); }
}


module.exports = { addGuildMembers, getGuildMembers, addUser, editUser, removeGuild };
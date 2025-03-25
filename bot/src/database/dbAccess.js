require('dotenv').config();
const discordUtil = require('../util/discordUtil.js');




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
  console.log(`DBS_FCH: ${url} : ${method}`);
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
  addUser, editUser, fetchDatabase
};
require('dotenv').config();


function addGuild(GUILD) {
  let botJoinTimestamp = GUILD.joinedTimestamp;
  let members = GUILD.members;

  members.cache.each(async (guildMember) => {
    if (guildMember.user.bot) { return; }
    let userData = {
      username: guildMember.user.username,
      lastMessageTimestamp: botJoinTimestamp
    };
    await addUser(GUILD.id, guildMember.user.id, userData);
  });
}


async function addUser(guildId, userId, data) {
  try {
    await fetchDatabase(
      `users/${guildId}/${userId}`,
      'POST',
      JSON.stringify(data)
    ).then((response) => {
      console.log(`ADD_USR: Added user ${data.username} to database`);
      console.log(`DBS_RPL: ${response}`);
    })
  } catch(error) {
    console.log(`DBS_ERR: ${error.stack}`);
  }
}


async function fetchDatabase(url, method='GET', body={}) {
  let response = await fetch(`${process.env.DATABASE_URL}/${url}`, {
    method: method,
    headers: { 'Content-Type': 'application/json' },
    body: body,
  });
  return response;
}


module.exports = { addGuild, addUser };
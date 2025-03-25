class Guild {
  constructor(Guild) {
    this.members = members;
    this.id = id;
  }
  get getMembers() { return this.members }
  get getId() { return this.id }
}

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



// gets Members from the Discord API, not from the Database.
async function getGuildMembers(Guild) {
  const members = Guild.members;
  let result = {}
  members.cache.each(async (guildMember) => {
    if (guildMember.user.bot) { return; }
    const username = guildMember.user.username;
    const lastMessageTimestamp = Math.floor(Date.now() / 1000);
    let userData = new User(username, lastMessageTimestamp);
    result[guildMember.user.id] = userData.getJson();
  });
  return result;
}


module.exports = {
  getGuildMembers,
  Guild, User
}
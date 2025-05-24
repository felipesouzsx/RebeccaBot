const { EmbedBuilder } = require('discord.js');


class Guild {
  constructor(Guild) {
    this.members = members;
    this.id = id;
  }
  get getMembers() { return this.members }
  get getId() { return this.id }
}

class User {
  constructor(username = 'unknown', lastMessageTimestamp = 0) {
    this.username = username;
    this.lastMessageTimestamp = lastMessageTimestamp;
    this.protected = false;
  }

  getJson() {
    return {
      username: this.username,
      protected: this.protected,
      lastMessageTimestamp: this.lastMessageTimestamp
    }
  }
}



// gets Members from the Discord API, not from the Database.
async function getGuildMembers(Guild) {
  const members = await Guild.members.fetch();
  let result = {}
  members.each(async (guildMember) => {
    if (guildMember.user.bot) { return; }
    const username = guildMember.user.username;
    const lastMessageTimestamp = Math.floor(Date.now() / 1000);
    let userData = new User(username, lastMessageTimestamp);
    result[guildMember.user.id] = userData.getJson();
  });
  return result;
}


function createEmbed(gifUrl=null, color='#aff6ea') {
  var newEmbed = new EmbedBuilder().setColor(color);
  if (gifUrl) { newEmbed.setImage(gifUrl) }
  return newEmbed;
}


module.exports = {
  getGuildMembers,
  createEmbed,
  Guild, User
}
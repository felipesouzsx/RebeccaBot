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
  constructor(props) {
    this.protected = false;
    this.lastMessageTimestamp = 0;
    this.username = "unknown";
    this.id = "unknown";
    Object.assign(this, props);
  }
  getJson() {
    let json = structuredClone(this);
    let {id, ...result} = json; // Using destructuring to remove id property
    return structuredClone(result);
  }
}



// gets Members from the Discord API, not from the Database.
async function getGuildMembers(Guild) {
  const members = await Guild.members.fetch();
  let result = {}
  members.each(async (guildMember) => {
    if (guildMember.user.bot) { return; }
    const username = guildMember.user.username;
    const id = guildMember.user.id;
    const lastMessageTimestamp = Math.floor(Date.now() / 1000);
    let NewUser = new User({
      'username': username, 
      'lastMessageTimestamp': lastMessageTimestamp,
      'id': id
    });
    result[id] = NewUser.getJson();
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
module.exports = async (CLIENT, guildId, userId) => {
  try {
    let guild = await CLIENT.guilds.fetch(guildId);
    let member = await guild.members.fetch(userId);

    console.log(`KCK_USR: ${member.user.username}`)
  } catch (error) {
    console.log(`KCK_USR: Error ${error}`)
  }
}
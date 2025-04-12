module.exports = async (CLIENT, guildId, userId) => {
  let guild = await CLIENT.guilds.cache.get(guildId);
  let member = await guild.members.cache.get(userId);
  member.kick();
  console.log(`BOT_KCK: Bot kicking user ${member.user.username}`)
}
const guildDb = require('../../database/guildDb.js');

module.exports = (CLIENT, ...args) => {
  let Guild = args[0];
  try {
    guildDb.remove(Guild.id);
    console.log(`GLD_DLT: Removed guild ${Guild.name}(${Guild.id}) from database.`);
  } catch (error) {
    console.log(`GLD_DLT: Error when removing deleted guild: ${error}`)
  }
}
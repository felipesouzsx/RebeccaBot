module.exports = async (CLIENT) => {
  CLIENT.user.setActivity('Cyberpunk 2077');
  console.log('BOT_STS: Online');
  deleteCommands(CLIENT);
  await registerCommands(CLIENT);
  let guildCheckScheduler = require('../../controller/guildChecker.js');
  guildCheckScheduler.start(CLIENT);
}


async function registerCommands(CLIENT) {
  for(command in CLIENT.commands) {
    CLIENT.application.commands.create(CLIENT.commands[command]);
    console.log(`REG_CMD: ${command}`);
  }
}


async function deleteCommands(CLIENT) {
  CLIENT.application.commands.set([]);
}
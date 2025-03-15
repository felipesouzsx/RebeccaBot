module.exports = (CLIENT) => {
  CLIENT.user.setActivity('Cyberpunk 2077');
  console.log('STATUS: Online');
  registerCommands(CLIENT);
}


function registerCommands(CLIENT) {
  for(command in CLIENT.commands) {
    CLIENT.application.commands.create(CLIENT.commands[command]);
    console.log(`REG_CMD: ${command}`);
  }
}
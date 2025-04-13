module.exports = async (CLIENT, ...args) => {
  const interaction = args[0];
  if (interaction.isChatInputCommand()) {
    CLIENT.commands[interaction.commandName].run(CLIENT, interaction);
  }
}
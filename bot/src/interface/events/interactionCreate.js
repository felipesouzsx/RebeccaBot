module.exports = async (CLIENT, ...args) => {
  const interaction = args[0];
  CLIENT.commands[interaction.commandName].run(CLIENT, interaction);
}
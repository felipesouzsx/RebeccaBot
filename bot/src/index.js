const { Client, GatewayIntentBits, Partials, SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const FileSystem = require('fs');
require('dotenv').config();


const CLIENT = new Client({
  intents: [ GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildVoiceStates ],
  partials: [ Partials.GuildMember ]
})
CLIENT.commands = {};


// Reads all modules under the events folder, every module is named after an
// event. Then, register all events on the discord API
// Event names:
// https://discord.js.org/docs/packages/discord.js/14.18.0/ClientEvents:Interface
FileSystem.readdir('./src/interface/events/', (error, files) => {
  if (error) { return console.log(`FIL_ERR: ${error} : ${error.stack}`); }
  files.forEach((file) => {
    if (!file.endsWith('.js')) { return; }
    const eventName = file.split('.')[0];
    CLIENT.on(eventName, require(`./interface/events/${file}`).bind(null, CLIENT));
    console.log(`ADD_EVT: ${eventName}`);
  })
})

// Almost the same thing as above, but for commands. Each module also has
// special properties, such as command options, that allow me to configure the
// commands here. Unlike events, commands can be named anything I want.
// List of valid options:
// https://discord.js.org/docs/packages/discord.js/14.18.0/SlashCommandBuilder:Class
// (warning: remove "add" from the name. So instead of
// "addChannelOption", just name use "ChannelOption".)
// Example: 
//     channel: {
//      type: 'ChannelOption',
//      description: 'example',
//      required: true
//     }
FileSystem.readdir('./src/interface/commands/', (error, files) => {
  if (error) { return console.log(`FIL_ERR: ${error} : ${error.stack}`); }
  files.forEach((file) => {
    if (!file.endsWith('.js')) { return; }
    const commandName = file.split('.')[0];
    const commandProps = require(`./interface/commands/${file}`);
    const Command = new SlashCommandBuilder()
      .setName(commandName)
      .setDescription(commandProps.description)
      .setDefaultMemberPermissions(commandProps.staffCommand ? PermissionFlagsBits.Administrator : null);
    for(option in commandProps.options) {
      const optionProps = commandProps.options[option]
      Command[`add${optionProps.type}`](Option => 
        Option.setName(option)
        .setDescription(optionProps.description)
        .setRequired(optionProps.required)
      );
    }
    Command.run = commandProps.run;
    CLIENT.commands[commandName] = Command;
    console.log(`ADD_CMD: ${file}`);
  })
})


// Connecting to discord
let token = process.env.TOKEN;
if (process.env.DEV) {
  console.log('\nEntering as developer\n');
  token = process.env.DEV_TOKEN;
}
CLIENT.login(token);
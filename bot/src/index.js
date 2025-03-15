const { Client, GatewayIntentBits, Partials, SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const FileSystem = require('fs');
require('dotenv').config();


const CLIENT = new Client({
  intents: [ GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildPresences ],
  partials: [ Partials.GuildMember ]
})
CLIENT.commands = {};


FileSystem.readdir('./src/interface/events/', (error, files) => {
  if (error) { return console.log(error); }
  files.forEach((file) => {
    if (!file.endsWith('.js')) { return; }
    let eventName = file.split('.')[0];
    CLIENT.on(eventName, require(`./interface/events/${file}`).bind(null, CLIENT));
  })
})


FileSystem.readdir('./src/interface/commands/', (error, files) => {
  if (error) { return console.log(error); }
  files.forEach((file) => {
    if (!file.endsWith('.js')) { return; }
    let commandName = file.split('.')[0];
    let commandProps = require(`./interface/commands/${file}`);
    const Command = new SlashCommandBuilder()
      .setName(commandName)
      .setDescription(commandProps.description)
      .setDefaultMemberPermissions(commandProps.staffCommand ? PermissionFlagsBits.Administrator : null);
    for(option in commandProps.options) {
      let optionProps = commandProps.options[option]
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


CLIENT.login(process.env.TOKEN);
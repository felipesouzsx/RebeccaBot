const DataBaseAccess = require('../../database/dbAccess.js');

module.exports.staffCommand = true;
module.exports.description = 'Lista algumas informações';


function sendChatMessage(interaction, message) {
  interaction.guild.channels.cache.get(interaction.channelId).send(message);
}


module.exports.run = async (CLIENT, interaction) => {
  interaction.reply('BOT_RSP: Gathering data from database...');

  let guildMembers = await DataBaseAccess.getGuildMembers(interaction.guild.id);
  let memberIds = Object.keys(guildMembers);
  let count = 0;
  let message = '';

  sendChatMessage(interaction, `BOT_RSP: Retrieved a total of ${memberIds.length} members.`);

  for(memberId in memberIds) {
    let member = guildMembers[memberIds[memberId]];
    let time = `<t:${member.lastMessageTimestamp}:R>`;
    message += `${memberId}. ${member.username} = ${time}\n`;
    count++;

    if (count == 20 || memberId == memberIds.length - 1) {
      sendChatMessage(interaction, message);
      message = '';
      count = 0;
    };
  }
}
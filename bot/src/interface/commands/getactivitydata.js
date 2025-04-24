const guildDB = require('../../database/guildDb.js');
const { getReply, getCommandFailReply, ReplyTypes } = require('../../util/replyUtil.js');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');


module.exports.staffCommand = true;
module.exports.description = 'Mostra o estado de atividade de cada membro!';


const membersPerPage = 10;
var currentIndex = 0;
var guildMembers;


function createButton(id, emoji) {
  return (
    new ButtonBuilder()
      .setCustomId(id)
      .setEmoji(emoji)
      .setStyle(ButtonStyle.Primary)
  )
}


function getMemberList(page=0) {
  let memberIds = Object.keys(guildMembers);
  let count = 0;
  let message = '';

  const row = new ActionRowBuilder();
  const backButton = createButton('back', '⬅️');
  const forwardButton = createButton('forward', '➡️');
  const pages = memberIds.length - membersPerPage;
  
  if (page > 0) {
    row.addComponents(backButton);
  } else {
    row.addComponents(backButton.setDisabled(true))
  }
  if (page < pages) {
    row.addComponents(forwardButton)
  } else {
    row.addComponents(forwardButton.setDisabled(true))
  }

  for (let i = page; i < page + membersPerPage; i++) {
    if (i >= memberIds.length) { 
      break; 
    }
    let memberData = guildMembers[memberIds[i]]
    message += memberData.protected ? '🛡️ ' : '🔴 ';
    message += `${memberData.username} <t:${memberData.lastMessageTimestamp}:R>\n`;
  }
  

  let reply = getReply(`Estado de atividade dos membros: `, ReplyTypes.NORMAL, null, true);
  let embed = reply.embeds[0];
  reply.components = [row];
  embed.setDescription(`Total de membros: ${memberIds.length}\n\n${message}`);
  embed.setFooter({ text: `Pág. ${page / 10 + 1}/${pages / 10 + 1}` })
  return reply;
}


module.exports.run = async (CLIENT, interaction) => {
  try {
    guildMembers = await guildDB.getMembers(interaction.guild.id);
  } catch(error) {
    interaction.reply(getCommandFailReply());
    return;
  }

  reply = getMemberList(currentIndex);
  reply.withResponse = true;

  interaction.reply(reply)
  .then((response) => {
    const message = response.resource.message;
    const collector = message.createMessageComponentCollector()
    collector.on('collect', async (buttonInteraction) => {
      currentIndex += buttonInteraction.customId == 'back' ? -membersPerPage : membersPerPage;
      buttonInteraction.update(getMemberList(currentIndex))
    })
  });
}
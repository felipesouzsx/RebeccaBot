const { createEmbed } = require('./discordUtil.js');
const { MessageFlags, Message } = require('discord.js');


class ReplyTypes {
  static get ERROR() {
    return 0;
  }
  static get NORMAL() {
    return 1;
  }
}


function getReply(text, type=1, image = null, ephemeral = false) {
  let color;
  switch (type) {
    case ReplyTypes.ERROR:
      color = '#fc8eae';
      break;
    default:
      color = '#aff6ea';
      break;
  }

  let embed = createEmbed(image, color);
  let flags = []

  if (ephemeral) { flags.push(MessageFlags.Ephemeral) }

  embed.setTitle(text);  
  return { embeds: [embed], flags: [MessageFlags.Ephemeral] };
}


function getCommandFailReply() {
  return getReply('Comando falhou. Tente novamente mais tarde.', ReplyTypes.ERROR, null, true);
}


module.exports = { getReply, getCommandFailReply, ReplyTypes }
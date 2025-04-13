const { createEmbed } = require('./discordUtil.js');


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
  embed.setTitle(text);
  return { embeds: [embed], ephemeral: ephemeral };
}


module.exports = { getReply, ReplyTypes }
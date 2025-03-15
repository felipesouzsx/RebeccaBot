const DataBaseAccess = require('../../database/dbAccess.js');


module.exports.description = 'use isso pra eu me configurar!';
module.exports.staffCommand = true;
module.exports.options = {
  logchannel: {
    type: 'ChannelOption',
    description: 'canal de logs!',
    required: true
  }
}


module.exports.run = (CLIENT, interaction) => {
  const GUILD = interaction.guild;
  DataBaseAccess.addGuild(GUILD);
}
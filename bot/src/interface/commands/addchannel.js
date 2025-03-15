module.exports.description = 'adiciona um canal pra eu ficar de olho';
module.exports.staffCommand = true;
module.exports.options = {
  channel: {
    type: 'ChannelOption',
    description: 'escolha um canal!',
    required: true
  }
}

module.exports.run = (CLIENT, interaction) => {
  console.log('boo');
}
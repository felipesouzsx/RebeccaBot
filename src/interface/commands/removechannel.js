module.exports.description = 'remove um canal da minha lista de vigia';
module.exports.staffCommand = true;
module.exports.options = {
  'channel': {
    'type': 'ChannelOption',
    'description': 'escolha um canal!',
    'required': true
  }
}

module.exports.run = (CLIENT, interaction) => {
  console.log('boo');
}
const { workerData, parentPort } = require('worker_threads');
const { isUserActive } = require('../util/timeUtil.js');


const SECONDS_BETWEEN_CHECKS = 5;

parentPort.on('message', (message) => {
  workerData.guilds = message;
})


async function checkGuilds() {
  let guilds = workerData.guilds;

  Object.keys(guilds).forEach((guildId) => {
    let guildMembers = guilds[guildId]
    Object.keys(guildMembers).forEach((memberId) => {
      let user = guilds[guildId][memberId];
      if (user.protected) { return }
      if (isUserActive(user)) { return }
      parentPort.postMessage({'type': 0, 'userId': memberId, 'guildId': guildId})
    })
  })

  parentPort.postMessage({'type': 1});
}


setInterval(checkGuilds, SECONDS_BETWEEN_CHECKS * 1000)
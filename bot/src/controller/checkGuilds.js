const { workerData, parentPort } = require('worker_threads');
const { isUserActive } = require('../util/timeUtil.js');
const userDb = require('../database/userDb.js');


const SECONDS_BETWEEN_CHECKS = 5;

parentPort.on('message', (message) => {
  workerData.guilds = message;
})


async function checkGuilds() {
  let guilds = workerData.guilds;

  Object.keys(guilds).forEach((guildId) => {
    Object.keys(guilds[guildId]).forEach(async (memberId) => {
      try {
        let user = await userDb.get(guildId, memberId);
        if (user.protected) { return }
        if (isUserActive(user)) { return }
        parentPort.postMessage({'type': 0, 'userId': memberId, 'guildId': guildId})
      } catch (error) {
        console.log(`GLD_CHK: Guild ${guildId} Member ${memberId} Error ${error}`);
      }
    })
  })
  parentPort.postMessage({'type': 1});
}


setInterval(checkGuilds, SECONDS_BETWEEN_CHECKS * 1000)
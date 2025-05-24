const { workerData, parentPort } = require('worker_threads');
const { SECONDS_IN_A_DAY, getCurrentTimestamp } = require('../util/timeUtil.js');
const userDb = require('../database/userDb.js');


const NOW = getCurrentTimestamp();
const DAYS_FOR_INACTIVITY = 180; // DO NOT TOUCH DO NOT TOUCH
const SECONDS_BETWEEN_CHECKS = 5;



parentPort.on('message', (message) => {
  workerData.guilds = message;
})


function is_user_active(user) {
  let daysSinceLastMessage = (NOW - user.lastMessageTimestamp) / SECONDS_IN_A_DAY;
  return (daysSinceLastMessage < DAYS_FOR_INACTIVITY)
}


async function checkGuilds() {
  let guilds = workerData.guilds;

  Object.keys(guilds).forEach((guildId) => {
    Object.keys(guilds[guildId]).forEach(async (memberId) => {
      try {
        let user = await userDb.get(guildId, memberId);
        if (user.protected) { return }
        if (!is_user_active(user)) { return }
        parentPort.postMessage({'type': 0, 'userId': memberId, 'guildId': guildId})
      } catch (error) {
        console.log(`GLD_CHK: Guild ${guildId} Member ${memberId} Error ${error}`);
      }
    })
  })
  parentPort.postMessage({'type': 1});
}


setInterval(checkGuilds, SECONDS_BETWEEN_CHECKS * 1000)
const { workerData, parentPort } = require('worker_threads');
const guildDb = require('../database/guildDb.js');
const { SECONDS_IN_A_DAY, SECONDS_IN_A_MONTH, getCurrentTimestamp } = require('../util/timeUtil.js')


const NOW = getCurrentTimestamp();
const INACTIVITY_TOLERANCE_DAYS = 0.93;


async function getGuildData(guildId) {
  let data = await guildDb.get(guildId);
  return data;
}


getGuildData(workerData.guildId).then((guildData) => {
  Object.values(guildData.users).forEach((user) => {
    let timeDifferenceDays = (NOW - user.lastMessageTimestamp) / SECONDS_IN_A_DAY;
    if (timeDifferenceDays > INACTIVITY_TOLERANCE_DAYS) {
      
    }
  })
})


const { workerData, parentPort } = require('worker_threads');
const { SECONDS_IN_A_DAY, getCurrentTimestamp } = require('../util/timeUtil.js')


const NOW = getCurrentTimestamp();
const INACTIVITY_TOLERANCE_DAYS = 0.93;
const inactiveUsers = [];


async function getInactiveUsers(guildUsers) {
  Object.values(guildUsers).forEach((user) => {
    let timeDifferenceDays = (NOW - user.lastMessageTimestamp) / SECONDS_IN_A_DAY;
    if (timeDifferenceDays < INACTIVITY_TOLERANCE_DAYS) { return }
    inactiveUsers.push(user);
  })
  parentPort.postMessage(inactiveUsers);
}

getInactiveUsers(workerData.guildUsers);

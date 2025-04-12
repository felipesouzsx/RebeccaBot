const { workerData, parentPort } = require('worker_threads');
const { SECONDS_IN_A_DAY, getCurrentTimestamp } = require('../util/timeUtil.js')


const NOW = getCurrentTimestamp();
const INACTIVITY_TOLERANCE_DAYS = 180; // DO NOT TOUCH DO NOT TOUCH
const inactiveUsers = [];


async function getInactiveUsers(guildUsers) {
  Object.keys(guildUsers).forEach((userId) => {
    const user = guildUsers[userId];
    if (user.protected) { return }
    let timeDifferenceDays = (NOW - user.lastMessageTimestamp) / SECONDS_IN_A_DAY;
    if (timeDifferenceDays < INACTIVITY_TOLERANCE_DAYS) { return }
    inactiveUsers.push(userId);
  })
  parentPort.postMessage(inactiveUsers);
}

getInactiveUsers(workerData.guildUsers);

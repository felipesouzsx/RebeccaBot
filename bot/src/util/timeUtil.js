const SECONDS_IN_A_DAY = 86400;
const SECONDS_IN_A_MONTH = SECONDS_IN_A_DAY * 30;
const DAYS_FOR_INACTIVITY = 180; // DO NOT TOUCH DO NOT TOUCH


function getCurrentTimestamp() {
  return Math.floor(Date.now() / 1000); // seconds to milliseconds
}

function isUserActive(user) {
  const NOW = getCurrentTimestamp();
  let daysSinceLastMessage = (NOW - user.lastMessageTimestamp) / SECONDS_IN_A_DAY;
  return (daysSinceLastMessage < DAYS_FOR_INACTIVITY)
}


module.exports = {
  SECONDS_IN_A_DAY,
  getCurrentTimestamp,
  isUserActive
}
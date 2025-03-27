
const SECONDS_IN_A_DAY = 86400;
const SECONDS_IN_A_MONTH = SECONDS_IN_A_DAY * 30;


function getCurrentTimestamp() {
  return Math.floor(Date.now() / 1000); // seconds to milliseconds
}


module.exports = {
  SECONDS_IN_A_DAY,
  getCurrentTimestamp
}

function getCurrentTimestamp() {
  return Math.floor(Date.now() / 1000); // seconds to milliseconds
}


module.exports = {
  getCurrentTimestamp
}
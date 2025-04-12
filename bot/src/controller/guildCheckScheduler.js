const { Worker } = require('worker_threads');
const guildDb = require('../database/guildDb.js');
const kickUser = require('./kickUser.js');


const SECONDS_BETWEEN_CHECKS = 10;
let CLIENT;


function setClient(value) {
  CLIENT = value;
}


async function getGuildUsers(guildId) {
  let data = await guildDb.get(guildId);
  return data.users;
}


async function createWorker(guildId) {
  const guildUsers = await getGuildUsers(guildId);

  return new Promise((resolve, reject) => {
    const worker = new Worker('./src/controller/checkGuild.js', {
      workerData: { guildUsers: guildUsers }
    });
    worker.on('message', (inactiveUsers) => {
      resolve(inactiveUsers);
    });
    worker.on('error', (error) => {
      reject(`GLD_CHK: Error ${error}`);
    });
  })
}


async function checkGuilds() {
  const guilds = await guildDb.getAllGuilds();

  guilds.forEach((guildId) => {
    createWorker(guildId)
    .then((inactiveUsers) => {
      console.log(`GLD_SCH: Checked guild ${guildId}`);
      inactiveUsers.forEach((userId) => {
        kickUser(CLIENT, guildId, userId);
      })
    })
    .catch((error) => {
      console.log(`GLD_SCH: Error ${error}`);
    });
  })
}


setInterval(() => {
  checkGuilds();
  console.log(`GLD_SCH: Guilds checked.`);
}, SECONDS_BETWEEN_CHECKS * 1000);


module.exports = { setClient }

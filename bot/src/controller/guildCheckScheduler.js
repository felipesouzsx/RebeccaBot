const { Worker } = require('worker_threads');
const guildDb = require('../database/guildDb.js');
const kickUser = require('./kickUser.js');


const SECONDS_BETWEEN_CHECKS = 10;
let CLIENT;


function setClient(value) {
  CLIENT = value;
}


async function getGuildUsers(guildId) {
  let data = {users: {}};
  try {
    data = await guildDb.get(guildId);
  } catch(error) {
    throw error;
  }
  return data.users;
}


async function createWorker(guildId) {
  let guildUsers = {}

  try {
    guildUsers = await getGuildUsers(guildId);
  } catch(error) {
    console.log(`GLD_CHK: Error ${error}`);
    return;
  }

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
  let guilds = [];

  try {
    guilds = await guildDb.getAllGuilds();
  } catch(error) {
    console.log(error);
    return;
  }

  await guilds.forEach((guildId) => {
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
  });
}


setInterval(() => {
  checkGuilds();
}, SECONDS_BETWEEN_CHECKS * 1000);


module.exports = { setClient }

const { Worker } = require('worker_threads');
const kickUser = require('./kickUser.js');
const guildDb = require('../database/guildDb.js');


async function updateWorkerGuildArray(worker) {
  let updatedGuildData = await getGuildData();
  worker.postMessage(updatedGuildData);
}


function create_worker(CLIENT, guilds) {
  const worker = new Worker('./src/controller/checkGuilds.js',
    {workerData: {guilds: guilds}}
  );

  worker.on('message', (data) => {
    switch (data.type) {
      case 0: // WHEN USER NEEDS TO BE KICKED
        let guildId = data.guildId;
        let inactiveUserId = data.userId;
        kickUser(CLIENT, guildId, inactiveUserId);
        break;
      case 1: // WHEN CHECK IS DONE
        updateWorkerGuildArray(worker);
        break;
    }
  })
  worker.on('error', (error) => {
    console.log(`GLD_CHK: Error on worker: ${error}`)
  })
}


async function getGuildData() {
  let data = {}
  try {
    data = await guildDb.getAllGuilds();
  } catch (error) {
    console.log(`GLD_CHK: Error fetching all guilds: ${error}`)
  }
  return data;
}


async function start(CLIENT) {
  let guilds = await getGuildData();
  create_worker(CLIENT, guilds);
}

module.exports = { start }
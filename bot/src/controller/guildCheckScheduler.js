const { Worker } = require('worker_threads');
const guildDb = require('../database/guildDb.js');
const { setTimeout } = require('node:timers/promises');
const { SECONDS_IN_A_DAY, SECONDS_IN_A_MONTH } = require('../util/timeUtil.js');


const SECONDS_BETWEEN_CHECKS = 30;


function createWorker(guildId) {
  return new Promise((resolve, reject) => {
    const worker = new Worker('./src/controller/checkGuild.js', {
      workerData: { guildId: guildId }
    });

    worker.on('exit', (exitCode) => {
      resolve(exitCode);
    });
    worker.on('error', (error) => {
      reject(`GLD_CHK: Error ${error}`);
    });
  })
}

function checkGuilds() {
  guildDb.getAllGuilds().then((guilds) => {
    guilds.forEach((guildId) => {
      createWorker(guildId)
      .then(() => {
        console.log(`GLD_SCH: Checked guild ${guildId}`);
      })
      .catch((error) => {
        console.log(`GLD_SCH: Error ${error}`);
      });
    })
  })
}

setInterval(() => {
  checkGuilds();
  console.log(`GLD_SCH: Guilds checked.`);
}, SECONDS_BETWEEN_CHECKS * 1000);


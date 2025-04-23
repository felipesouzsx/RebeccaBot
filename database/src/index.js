const express = require('express');
const Users = require('./users.js');
const Guild = require('./guild.js');
require('dotenv').config();


const app = express();
app.use(express.json());
const server = app.listen(process.env.PORT, () => {
  console.log(`SVR_STS: Online. Listening at ${process.env.URL}:${process.env.PORT}`);
});

function isNumber(num) {
  return (!isNaN(parseFloat(num)) && isFinite(num));
}

function isValid(input) {
  let result = (isNumber(input));
  console.log(`${result ? 'VLD_' : 'INV_'}PAR: ${input}`);
  return result;
}



// HTTP requests

app.post('/guilds/:guildId', async (request, response) => {
  if (!isValid(request.params.guildId)) {
    response.sendStatus(400); // BAD REQUEST
    return;
  }
  let status = Guild.add(request.params.guildId, request.body);
  response.sendStatus(status);
  console.log(`ADD_GLD: ${request.params.guildId} : ${status}`);
});

app.post('/guilds/:guildId/users/:userId', async (request, response) => {
  if (!isValid(request.params.guildId) || !isValid(request.params.userId)) {
    response.sendStatus(400); // BAD REQUEST
    return;
  }
  let status = Users.add(request.params.guildId, request.params.userId, request.body);
  response.sendStatus(status);
  console.log(`ADD_USR: ${request.params.userId} : ${status}`);
});




app.get('/guilds/', async (request, response) => {
  let result = await Guild.getAll();
  response.type('json');
  response.send(JSON.stringify(result));
});

app.get('/guilds/:guildId', async (request, response) => {
  if (!isValid(request.params.guildId)) {
    response.sendStatus(400); // BAD REQUEST
    return;
  }
  let guild = await Guild.get(request.params.guildId);
  let guildDocument = await guild.get();
  let result = guildDocument.data()
  response.status(guildDocument.exists ? 200 : 404);
  response.type('json');
  response.send(JSON.stringify(result));
});

app.get('/guilds/:guildId/users', async (request, response) => {
  if (!isValid(request.params.guildId)) {
    response.sendStatus(400); // BAD REQUEST
    return;
  }
  let result = await Guild.getUsers(request.params.guildId);
  response.type('json');
  response.status(result != undefined ? 200 : 404)
  response.send(JSON.stringify(result));
});

app.get('/guilds/:guildId/users/:userId', async (request, response) => {
  if (!isValid(request.params.guildId) || !isValid(request.params.userId)) {
    response.sendStatus(400); // BAD REQUEST
    return;
  }
  let user = await Users.get(request.params.guildId, request.params.userId);
  response.type('json'); 
  response.status(user != undefined ? 200 : 404); // User is undefined if it or the guild doesnt exist
  response.send(JSON.stringify(user));
});




app.put('/guilds/:guildId/users/:userId', async (request, response) => {
  if (!isValid(request.params.guildId) || !isValid(request.params.userId)) {
    response.sendStatus(400); // BAD REQUEST
    return;
  }
  let status = await Users.edit(request.params.guildId, request.params.userId, request.body);
  response.sendStatus(status);
})




app.delete('/guilds/:guildId/users/:userId', async (request, response) => {
  if (!isValid(request.params.guildId) || !isValid(request.params.userId)) {
    response.sendStatus(400); // BAD REQUEST
    return;
  }
  let status = await Users.remove(request.params.guildId, request.params.userId);
  response.sendStatus(status);
  console.log(`RMV_USR: ${request.params.userId} from guild ${request.params.guildId} : ${status}`);
})

app.delete('/guilds/:guildId', async (request, response) => {
  if (!isValid(request.params.guildId)) {
    response.sendStatus(400); // BAD REQUEST
    return;
  }
  let status = await Guild.remove(request.params.guildId);
  response.sendStatus(status);
  console.log(`RMV_GLD: ${request.params.guildId} : ${status}`);
})
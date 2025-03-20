const express = require('express');
const Users = require('./users.js');
const Guild = require('./guild.js');
require('dotenv').config();


const app = express();
app.use(express.json());
const server = app.listen(process.env.PORT, () => {
  console.log(`SVR_STS: Online. Listening at ${process.env.URL}:${process.env.PORT}`);
});


// HTTP requests

app.post('/guilds/:guildId', async (request, response) => {
  Guild.add(request.params.guildId, request.body);
  response.sendStatus(200);
  console.log(`ADD_GLD: ${request.params.guildId}`);
});
app.post('/guilds/:guildId/users/:userId', async (request, response) => {
  Users.add(request.params.guildId, request.params.userId, request.body);
  response.sendStatus(200);
  console.log(`ADD_USR: ${request.params.userId}`);
});
app.post('/guilds/:guildId/watchlist/:channelId', async (request, response) => {
  try {
    Guild.addChannelToWatchlist(request.params.guildId, request.params.channelId);
  } catch(error) {
    console.log(`DBS_ERR: ${error}`);
    response.sendStatus(500);
    return;
  }
  response.sendStatus(201);
  console.log(`ADD_CHL: ${request.params.channelId}`);
})


app.get('/guilds/:guildId/users/:userId', async (request, response) => {
  let user = await Users.get(request.params.guildId, request.params.userId);
  response.send(JSON.stringify(user));
});
app.get('/guilds/:guildId/users', async (request, response) => {
  let result = await Guild.getUsers(request.params.guildId);
  response.send(JSON.stringify(result));
});
app.get('/guilds/:guildId/watchlist', async (request, response) => {
  let result = await Guild.getWatchlist(request.params.guildId);
  response.send(JSON.stringify(result));
})


app.put('/guilds/:guildId/users/:userId', async (request, response) => {
  Users.edit(request.params.guildId, request.params.userId, request.body);
  response.sendStatus(200);
})


app.delete('/guilds/:guildId/users/:userId', async (request, response) => {
  Users.remove(request.params.guildId, request.params.userId);
  response.sendStatus(204);
  console.log(`RMV_USR: ${request.params.guildId}`);
})
app.delete('/guilds/:guildId', async (request, response) => {
  Guild.remove(request.params.guildId);
  response.sendStatus(204);
  console.log(`RMV_GLD: ${request.params.guildId}`);
})
//TODO
app.delete('/guilds/:guildId/watchlist/:channelId', async (request, response) => {
  Guild.removeChannelFromWatchlist(request.params.guildId, request.params.channelId);
  response.sendStatus(204);
  console.log(`RMV_CHL: ${request.params.channelId}`);
})
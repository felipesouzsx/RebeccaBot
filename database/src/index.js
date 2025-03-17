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

app.post('/guilds/:guildId/users/:userId', async (request, response) => {
  Users.add(request.params.guildId, request.params.userId, request.body);
  response.sendStatus(200);
});


app.get('/guilds/:guildId/users/:userId', async (request, response) => {
  let user = await Users.get(request.params.guildId, request.params.userId);
  response.send(JSON.stringify(user));
});
app.get('/guilds/:guildId/users', async (request, response) => {
  let result = await Guild.getUsers(request.params.guildId);
  response.send(JSON.stringify(result));
});


app.put('/guilds/:guildId/users/:userId', async (request, response) => {
  Users.edit(request.params.guildId, request.params.userId, request.body);
  response.sendStatus(200);
})


app.delete('/guilds/:guildId/users/:userId', async (request, response) => {
  Users.remove(request.params.guildId, request.params.userId);
  response.sendStatus(204);
})
app.delete('/guilds/:guildId', async (request, response) => {
  Guild.remove(request.params.guildId);
  console.log(`RMV_GLD: ${request.params.guildId}`);
  response.sendStatus(204);
})
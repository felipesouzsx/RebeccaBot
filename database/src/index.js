const express = require('express');
const Users = require('./user.js');
const Guild = require('./guild.js');
require('dotenv').config();


const app = express();
app.use(express.json());
const server = app.listen(process.env.PORT, () => {
  console.log(`SVR_STS: Online. Listening at ${process.env.URL}:${process.env.PORT}`);
});


// Users
app.post('/users/:guildId/:userId', async (request, response) => {
  Users.addUser(request.params.guildId, request.params.userId, request.body);
  response.sendStatus(201);
});

app.get('/users/:guildId/:userId', async (request, response) => {
  response.sendStatus(403);
});

app.put('/users/:guildId/:userId', async (request, response) => {
  response.sendStatus(403);
})

app.delete('/users/:guildId/:userId', async (request, response) => {
  response.sendStatus(403);
})




// Guild
app.post('/guilds/:guildId', async (request, response) => {
  response.sendStatus(403);
});

app.get('/guilds/:guildId', async (request, response) => {
  let result = await Guild.getGuildUsers(request.params.guildId);
  response.send(JSON.stringify(result));
});

app.put('/users/:guildId', async (request, response) => {
  response.send(403);
})

app.delete('/users/:guildId', async (request, response) => {
  response.send(403);
})
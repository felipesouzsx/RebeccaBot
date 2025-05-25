<h1 align="center">Rebecca</h1>

Rebecca is a simple Discord bot that detects and kicks inactive members from your server.
As of 2025 it's being used exclusively by a few friends of mine to remove random people from our server.

The bot will kick anyone that:
1. Doesn't join a call for 6 months
2. Doesn't send a message for 6 months

<p align="center">
  <img src="https://media1.tenor.com/m/eyFCzr957NsAAAAd/edge-runners-rebecca.gif" alt="A scene from Cyberpunk Edgerunners where Rebecca is handing a beer to David" />
</p>

---
# Setup
1. Add the bot to your discord server [by clicking here](https://discord.com/oauth2/authorize?client_id=1303852635077611570&permissions=8&response_type=code&redirect_uri=https%3A%2F%2Fdiscord.com%2Foauth2%2Fauthorize%3Fclient_id%3D1303852635077611570&integration_type=0&scope=guilds.channels.read+bot+guilds+guilds.members.read+messages.read+voice)
2. When the bot joins, use the **/addguild** command.
3. Congrats! The bot should be working :)

# Commands
1. **/addguild:** Adds a server(all its members) to the database.
2. **/removeguild:** Removes a guild from the database.
3. **/showactivitydata:** Shows all members and if they're active or not. The following emojis will be next to their names:
   > 🔴 Not active<br>
   > 🟢 Active<br>
   > 🛡️ Protected<br>
5. **/protectuser [user]:** Protects a user from being kicked by the bot.
6. **/unprotectuser [user]:** Unprotects a user.
7. **/poke:** Pokes the bot to see if it's alive or not.

const userDb = require('../../database/userDb.js');
const { User } = require('../../util/discordUtil.js');
const { getCurrentTimestamp } = require('../../util/timeUtil.js');


module.exports = (CLIENT, ...args) => {
  let Member = args[0];
  let Guild = Member.guild;
  let UserData = Member.user;

  if (UserData.bot) { return }

  try {
    let NewUser = new User(UserData.username, getCurrentTimestamp());
    userDb.add(Guild.id, UserData.id, NewUser);
    console.log(`MBR_ADD: Added user ${NewUser.username} to database.`)
  } catch (error) {
    console.log(`MBR_ADD: An error occurred when adding a new member: ${error}`);
  }
}
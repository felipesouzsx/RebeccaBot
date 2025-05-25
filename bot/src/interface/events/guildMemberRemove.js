const userDb = require('../../database/userDb.js');


module.exports = (CLIENT, ...args) => {
  let Member = args[0];
  let Guild = Member.guild;
  let UserData = Member.user;

  if (UserData.bot) { return }

  try {
    userDb.remove(Guild.id, UserData.id);
    console.log(`MBR_RMV: Removed user ${UserData.username} from database.`)
  } catch (error) {
    console.log(`MBR_ADD: An error occurred when removing a member: ${error}`);
  }
}
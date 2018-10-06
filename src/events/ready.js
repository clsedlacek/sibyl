const callLog = require("../functions/callLog.js")

module.exports = (client, guild) => {
	//code to execute upon login
	console.log('Log', 'Logged in!');
	callLog.botRestart(client);
};
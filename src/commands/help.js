const Discord = require('discord.js');

module.exports = (client, message, args) => {
	message.author.sendMessage("Greetings traveller, I am **Sibyl the Oracle**. I keep a close eye on the everyone and perform minor housekeeping tasks. \n\nYou can summon me using the following commands: \n`!help - displays this message` \n`!roll d20 - roll dice in d20 and other increments` \n`!ping - return latency in milliseconds` \n`!serverinfo - query server information`");
	console.log('Log', 'Someone needs help...');
};

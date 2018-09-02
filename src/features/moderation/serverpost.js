const Discord = require('discord.js');
const help = require('../features/moderation/serverpost.js');

//THIS DOESN'T DO ANYTHING YET

module.exports = (client, message, args) => {
	console.log('Log', 'Printing out #server embeds...');
	if (args.length === 0) {
		return message.channel.send(`Please specify an embed name.`)
	};

	if (args[0] === "1") {
		return
	}
	else if (args[0] === "2") {
		return
	}
	else {
		return
	}
};

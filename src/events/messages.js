const Discord = require('discord.js');
const roles = require('../../config/roles.json');
const channels = require('../../config/channels.json');
const introductions = require('../features/introductions.js');
const callLog = require('../functions/callLog.js');

module.exports = {
	send: function(client, message) {
		callLog.messageSend(client, message);

		if(message.author.bot) return;
	
		// if message is send in #introductions channel, register them via introductions.js
		if(message.channel.id == channels.introductions) {
			introductions.registerIntroduction(message.author);
			return;
		};
	
		// log everything and check if message is a user's command
		if(message.content.indexOf(client.config.prefix) !== 0) return;
	
		//make sure first index of string is the specified command prefix
		const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
	
		//magic formula to reformat message into command-argument array
		const command = args.shift().toLowerCase();
	
		if (client.commands.has(command)) {
			client.commands.get(command)(client, message, args);
			return;
		};	
	},

	deleted: function(client, message) {
		callLog.messageDeleted(client, message);
	},

	updated: function(client, oldMessage, newMessage) {
		callLog.messageEdited(client, oldMessage, newMessage)
	}

}

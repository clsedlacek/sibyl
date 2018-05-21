const Discord = require('discord.js');
const roles = require('../../config/roles.json');
const channels = require('../../config/channels.json');
const introductions = require('../features/introductions.js');

module.exports = (client, message) => {
	console.log('Log', message.createdTimestamp + " @" + message.author.username + " in " + message.channel + " said: " + message.content);

	if(message.author.bot) return;

	if(message.channel.id == channels.introductions) {
		introductions.registerIntroduction(message.member);
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

};

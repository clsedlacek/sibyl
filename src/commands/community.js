const Discord = require('discord.js');
const community = require('../features/moderation/community.js');

module.exports = (client, message, args) => {
	console.log('Log', 'add-to-community command call');
	let callingUser = message.member;

	if (args.length === 0) {
		return community.sendAddCommunityFailMessage(message.channel);
	}; 
}

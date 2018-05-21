const Discord = require('discord.js');
const roles = require('../../config/roles.json');
const channels = require('../../config/channels.json');
const meetup = require('../features/meetups/meetup.js');


module.exports = (client, message, args) => {
	console.log('Log', 'someone wants to be a meathead...');
	let regularRole = message.member.guild.roles.find("name", roles.community);   
	let meetupRole = message.member.guild.roles.find("name", roles.locationVerified);
	let meetupUser = message.member;

	if (args.length === 0) {
		return meetup.sendMeetupFailMessage(message.channel);
	};    

	if (meetup.checkMeetupPermissions(meetupUser)) {
		meetup.addUserMeetup(meetupUser, args.join(' '));
	}
	else {
		meetup.sendIncorrectPermissionsMessage(message.channel);
	}
};

const Discord = require('discord.js');
const meetup = require('../features/meetups/meetup.js');


module.exports = (client, message, args) => {
	console.log('Log', 'someone wants to be a meathead...');
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

const Discord = require('discord.js');
const roles = require('../../../config/roles.json');
const channels = require('../../../config/channels.json');

module.exports = {
	checkMeetupPermissions: function(guildMember) {
		let meetupEligibleRole = guildMember.guild.roles.find("name", roles.community);
		if (guildMember.roles.find("name", meetupEligibleRole.name)) {
			return true;
		}
		return false;
	},

	addUserMeetup: function(guildMember, locationString) {
		let meetupRole = guildMember.guild.roles.find("name", roles.locationVerified);
		let meetupNotificationMessage = (`**<@${guildMember.user.id}>** has been deemed ${meetupRole.name} at location **${locationString}**`);

		return guildMember.addRole(meetupRole)
		.then(() => {
			return guildMember.guild.channels.find("id", channels.meetups).send(meetupNotificationMessage);
		}).then(message => {
			return message.pin();	
		}).catch(console.error);
	},

	sendMeetupFailMessage: function(guildChannel) {
		return guildChannel.send(`Please specify your location. Example: \`!meetup New York City\``)
	},

	sendIncorrectPermissionsMessage: function(guildChannel) {
		return guildChannel.send(`Meetup rights are only available to ${roles.community}`)            
	}
}

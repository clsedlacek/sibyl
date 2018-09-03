const Discord = require('discord.js');
const roles = require('../../../config/roles.json');
const channels = require('../../../config/channels.json');

module.exports = {
	// this function will if user already has the role they specify
	doesUserHaveRole: function(guildMember, roleName) {
		console.log(`UserRole request of "${roleName}" made...`);		
		let userRole = guildMember.guild.roles.find("name", roles[roleName]);		// bracket notation allows for multiple roles to use this function via an argument
		
		// check if user has that role, return true if found
		console.log(`Checking if ${guildMember.user.name} has ${userRole} role...`);
		if (guildMember.roles.find("name", roles[roleName])) {
			return true;	// the user is already stoned
		}
		return false;	// the user must be stoned
	},

	// this should be changed to add member to specified role
	addUserRole: function(callingMember, guildChannel, roleName) {
		let userRoleName = roleName;				// designate what role we're checking for
		if (callingMember.guild.roles.find("name", roles[roleName])) {
			console.log(`${roleName} found!`);
		} else {
			guildChannel.send(`I can't find that role.`);
			return
		};

		const userRole = callingMember.guild.roles.find("name", roles[roleName]);			// find user role in config
		const notificationMessage = (`Congratulations, <@${callingMember.user.id}>! You are now ${userRole}.`);

		return callingMember.addRole(userRole)

		.then(() => {
			return guildChannel.send(notificationMessage);
		}).catch(console.error);
	},

	// this removes the role if the user is already too high
	removeUserRole: function(callingMember, guildChannel, roleName) {
		let userRoleName = roleName; // designate what role we're checking for
		const userRole = callingMember.guild.roles.find("name", roles[roleName]);			// find user role in config
		guildChannel.send(`I've removed your ${userRole} role.`);
		return callingMember.removeRole(userRole)
	}
}

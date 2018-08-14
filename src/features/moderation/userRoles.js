const Discord = require('discord.js');
const roles = require('../../../config/roles.json');
const channels = require('../../../config/channels.json');

module.exports = {
	// this function will if user already has the role they specify
	doesUserHaveRole: function(guildMember, roleName) {
		console.log(`UserRole request of "${roleName}" made...`);		
		let userRole = guildMember.guild.roles.find("name", roles.stoned);		// this could be replaced with a function to handle other altered states
		
		// check if user has that role, return true if found
		console.log(`Checking if ${guildMember.user.name} has ${userRole.name} role...`);
		if (guildMember.roles.find("name", userRole.name)) {
			return true;	// the user is already stoned
		}
		return false;	// the user must be stoned
	},

	// this should be changed to add member to specified role
	addUserRole: function(callingMember, guildChannel, roleName) {
		let userRoleName = roleName;				// designate what role we're checking for
	
		const userRole = callingMember.guild.roles.find("name", roles.stoned);			// this could be replaced with a function to handle other altered states
		const notificationMessage = (`User <@${callingMember.user.id}> now has role ${userRole}.`);

		return callingMember.addRole(userRole)
		.then(() => {
			return guildChannel.send(notificationMessage);
		}).catch(console.error);
	},

	// this removes the role if the user is already too high
	removeUserRole: function(callingMember, guildChannel, roleName) {
		let userRoleName = roleName; // designate what role we're checking for
	
		const userRole = callingMember.guild.roles.find("name", roles.stoned);		// this could be replaced with a function to handle other altered states
		guildChannel.send(`You're already too high! I've removed your role.`)
		return callingMember.removeRole(userRole)
	}
}

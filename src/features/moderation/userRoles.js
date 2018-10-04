const Discord = require('discord.js');
const roles = require('../../../config/roles.json');
const replies = require('../../../data/replies/userRoles');
const channels = require('../../../config/channels.json');

module.exports = {
	// generates a role name without the  mentions
	getUnmentionable: function(userRole) {						
		const userRoleLength = userRole.length;
		const unmentionableName = String(userRole.name).substring(3, userRoleLength).toLowerCase(); // trims first 3 characters ("@ ")
		return unmentionableName;
	},

	// this function will check if user already has the role they're requesting'
	doesUserHaveRole: function(guildMember, roleName) {
		console.log(`UserRole request of "${roleName}" made...`);		
		let userRole = guildMember.guild.roles.find("name", roles[roleName]);		// bracket notation allows for multiple roles to use this function via an argument

		// to check if user has that role, and return true if found:
		console.log(`Checking if ${guildMember.user.name} has ${userRole} role...`);
		if (guildMember.roles.find("name", roles[roleName])) {
			return true;	// the user is already stoned
		}
		return false;	// the user must be stoned
	},

	// then we will give the user that role
	addUserRole: function(callingMember, guildChannel, roleName) {
		// find it in the json file, or return an error:
		if (callingMember.guild.roles.find("name", roles[roleName])) {
			console.log(`${roleName} found!`);
		} else {
			guildChannel.send(`I can't find that role.`);
			return
		};

		// send a [random] message to the user  in chat
		// find user role in config (this is redundant and could be refactored/scoped better):
		const userRole = callingMember.guild.roles.find("name", roles[roleName]);	
		unmentionableName = module.exports.getUnmentionable(userRole);

		//get random reply and send it if successful
		let randomChoice = Math.floor((Math.random() * 20 ) );
		let notificationMessage = replies.assignReply(randomChoice, callingMember, unmentionableName);
		return callingMember.addRole(userRole)
		.then(() => {
			return guildChannel.send(notificationMessage);
		}).catch(console.error);
	},

	// this removes the role if the user is already too high
	removeUserRole: function(callingMember, guildChannel, roleName) {
		let unmentionableName = roleName; // designate what role we're checking for
		const userRole = callingMember.guild.roles.find("name", roles[roleName]);			// find user role in config
		userRoleName = module.exports.getUnmentionable(userRole);

		//get random reply and send it
		let randomChoice = Math.floor((Math.random() * 20 ) );
		let notificationMessage = replies.unassignReply(randomChoice, callingMember, unmentionableName);
		return callingMember.removeRole(userRole)
		.then(() => {
			return guildChannel.send(notificationMessage);
		}).catch(console.error);
	}
}

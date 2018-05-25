const Discord = require('discord.js');
const roles = require('../../../config/roles.json');

module.exports = {
	checkAddCommunityPermissions: function(guildMember) {
		let addCommunityRole  = guildMember.guild.roles.find("name", roles.operator);
		if (guildMember.roles.find("name", addCommunityRole.name)) {
			return true;
		}
		return false;
	},

	sendAddCommunityFailMessage: function(guildChannel) {
		return guildChannel.send(`Please specify which member to add to ${roles.community}. Example: \`!community [member]\``)
	},
}

const Discord = require('discord.js');
const roles = require('../../config/roles.json');
const channels = require('../../config/channels.json');

module.exports = {
	sendWelcomeMessage: function(guildMember) {
		let welcomeMessage = `**Welcome to the server, <@${guildMember.id}>!** In order to access more chat channels, please share something about yourself such as your age, pronouns/gender, general location, interests, or what brings you here. Please take some time to read the rules and guidelines in <#${channels.server}> and enjoy your stay! If you have any questions, feel free to ask us in <#${channels.casual}>.`
		return guildMember.guild.channels.find("id", channels.introductions).send(welcomeMessage);
	},

	registerIntroduction: function(guildMember) {
		console.log(`${guildMember.user.tag} wrote an introduction.`);        
		normieRole = guildMember.guild.roles.find("name", roles.registree);
		console.log(`${guildMember.user.tag} is now a ${roles.registree}`);        
		return guildMember.addRole(normieRole).catch(console.error);

	}
}

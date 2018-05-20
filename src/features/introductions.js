const Discord = require('discord.js');
const roles = require('../../config/roles.json');
const channels = require('../../config/channels.json');

module.exports = {
	sendWelcomeMessage: function(guildMember) {
		let welcomeMessage = `**Welcome to the server, <@${guildMember.id}>!** In order to access the chat channels, write your A/S/L and something about yourself here. Please take some time to read the rules and guidelines in #server and enjoy your stay!`
		return guildMember.guild.channels.find("id", channels.introductions).send(welcomeMessage);
	},

	registerIntroduction: function(guildMember) {
		console.log(`${guildMember.user.tag} wrote an introduction.`);        
		normieRole = guildMember.guild.roles.find("name", roles.registree);
		console.log(`${guildMember.user.tag} is now a ${roles.registree}`);        
		return guildMember.addRole(normieRole).catch(console.error);

	}
}

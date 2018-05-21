const channels = require('../../config/channels.json');
const introductions = require('../features/introductions.js');

module.exports = (client, member) => {
	//log when a user joins server
	console.log('Log', `${member.user.tag} (${member.id}) has joined ${member.guild.name} (${member.guild.id})`);

	//send welcome message
	introductions.sendWelcomeMessage(member);
}

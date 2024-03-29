const channels = require('../../config/channels.json');
const roles = require('../../config/roles.json');

const messageLogging = 1;		// toggles logging of all sent messages (messageSend() below)
const makeEmbed = require('./makeEmbed.js')

module.exports = {
	messageSend: function(client, message) {
		if(message.author.bot) return;
		if(messageLogging) {
			console.log(`Log: ${message.author.tag}: ${message}`);
			makeEmbed.simpleLog(client, `10070709`, `Log: **Message Sent**`, `${message.author.tag}: ${message}`);
		}
		return
	},

	messageDeleted: function(client, message) {
		logchan = client.channels.find("id", channels.logs);
		if(message.author.bot ==1 && message.channel == logchan) { // if messages in the logs channel posted by a bot are being deleted, report a security breach
			makeEmbed.simpleLog(client, `15478621`, `Log: **Security: Someone is deleting the logs!**`, "");
		}
		console.log(`Log: Message Deleted: ${message.author.tag}:\n> ${message}`);
		makeEmbed.simpleLog(client, `15478621`, `Log: **Message Deleted**`, `**${message.author.tag}** in **${message.channel}**:\n${message}`);
		return
	},

	messageEdited: function(client, oldMessage, newMessage) {
		if(oldMessage.author.bot) return;
		console.log(`Log: Message CHANGED in ${newMessage.channel} by ${newMessage.author.tag}. From: \n> ${oldMessage}\nTo:\n> ${newMessage}`);
		makeEmbed.twoferLog(client, `16761600`, `Log: **Content Changed** or link embed update`, `Message by **${oldMessage.author.tag}** in **${oldMessage.channel}** has been changed`, "**From:**", `${oldMessage}`, "**To:**", `${newMessage}`);
		return
	},

	userJoined: function(client, member, invite, inviter) {
		console.log(`Log: ${member.user.tag} joined using invite code ${invite.code} from ${inviter.tag}. Invite was used ${invite.uses} times since its creation.`);
		makeEmbed.simpleLog(client, `14350246`, `Log: **User Joined**`, `${member.user.tag} joined using invite code ${invite.code} from ${inviter.tag}. Invite was used ${invite.uses} times since its creation.`);
	},

	userDeparted: function(client, member) {
		console.log('Log', `${member.user.tag} (${member.id}) has departed.`);
		makeEmbed.simpleLog(client, `15478621`, `Log: **User Departed**`, `**${member.user.tag}** has departed (or been kicked).`);
	},
	userBanned: function(client, guild, user) {
		console.log('Log', `${user.tag} (${user.id}) has been banned.`);
		makeEmbed.simpleLog(client, `15478621`, `Log: **User Banned**`, `**${user.tag}** has been **banned**.`);
	},

	userUnbanned: function(client, guild, user) {
		console.log('Log', `${user.tag} (${user.id}) has been unbanned.`);
		makeEmbed.simpleLog(client, `16761600`, `Log: **User Unbanned**`, `**${user.tag}** has been **unbanned**.`);
	},

	botRestart: function(client, guild) {
//		const techRole = guild.roles.find("name", roles.technicians);
		console.log('Log', `Sibyl has restarted.`);
		makeEmbed.simpleLog(client, `15478621`, `Log: **Bot Rebooted**`, `I have either been restarted by a user, or crashed and was reincarnated by the server host.`);
	}
}
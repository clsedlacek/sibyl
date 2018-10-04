const channels = require('../../config/channels.json');
const messageLogging = 0;		// enable/disable logging of all messages
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
		if(message.author.bot ==1 && message.channel == logchan) {
			makeEmbed.simpleLog(client, `15478621`, `Log: **Security: Someone is deleting the logs!**`, "");
		}
		console.log(`Log: Message Deleted: ${message.author.tag}:\n> ${message}`);
		makeEmbed.simpleLog(client, `15478621`, `Log: **Message Deleted**`, `**${message.author.tag}** in **${message.channel}**:\n${message}`);
		return
	},

	messageEdited: function(client, oldMessage, newMessage) {
		if(oldMessage.author.bot) return;
		console.log(`Log: Message CHANGED in ${newMessage.channel} by ${newMessage.author.tag}. From: \n> ${oldMessage}\nTo:\n> ${newMessage}`);
		makeEmbed.twoferLog(client, `16761600`, `Log: **Content Changed**`, `Message by **${oldMessage.author.tag}** in **${oldMessage.channel}** has been changed`, "**From:**", `${oldMessage}`, "**To:**", `${newMessage}`);
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
	}
}
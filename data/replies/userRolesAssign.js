const Discord = require('discord.js');

module.exports = {
	assignReply(choice, callingMember, userRole) {
		const replies = [
		`Congratulations, <@${callingMember.user.id}>! You are now ${userRole}.`,
		`I see <@${callingMember.user.id}> is ${userRole} again.`,
		`I've assigned <@${callingMember.user.id}> the duty of ${userRole}.`,
		`<@${callingMember.user.id}> is ${userRole}.`,
		`By Dionysus's will, you are now ${userRole}, O mortal <@${callingMember.user.id}>.`,
		`<@${callingMember.user.id}> is almost certainly ${userRole}.`,
		`<@${callingMember.user.id}> has assumed the rank of ${userRole}.`,
		`Alright, <@${callingMember.user.id}> might be ${userRole} now, but all things pass.`,
		`<@${callingMember.user.id}> is totally ${userRole}.`,
		`<@${callingMember.user.id}>, whether ${userRole} or not ${userRole}, is nonetheless <@${callingMember.user.id}>.`
		];

		return replies[choice]
	}
}
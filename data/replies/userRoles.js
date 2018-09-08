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
	},

	unassignReply(choice, callingMember, userRole) {
		const replies = [
		`I've removed your ${userRole} role.`,
		`You're already ${userRole}.`,
		`The <@${callingMember.user.id}> has landed.`,
		`Your ${userRole} rank is undone.`,
		`Dionysus will be displeased.`,
		`<@${callingMember.user.id}> is no longer ${userRole}.`,
		`To be fair, you haven't been ${userRole} for a short while now.`,
		`Alright, party's over.`,
		`You are no longer ${userRole}.`,
		`I've banished your ${userRole} plight, be free.`
		];

		return replies[choice]
	}
}
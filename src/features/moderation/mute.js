const Discord = require('discord.js');
const roles = require('../../../config/roles.json');
const channels = require('../../../config/channels.json');
const moderationConfig = require('../../../config/moderation.json');


// check if mute react is valid based on user role permissions
function checkUserMutePermissions(reactGuild, reactUser) {
	let voterRole = reactGuild.roles.find("name", roles.community);

	return reactGuild.fetchMember(reactUser)
	.then(guildMember => {
		if (guildMember.roles.find("name", voterRole.name)) {
			console.log(reactUser.tag + " has the peer-mute Role, mute vote will be counted.");
			return true;
		};

		return false;
	})
};


// mutes a user
function muteUser(userTarget) {
	let muteRole = userTarget.guild.roles.find("name", roles.hushed);
	let communityRole = userTarget.guild.roles.find("name", roles.community);
	let memberRole = userTarget.guild.roles.find("name", roles.registree);    

	let rolePromises = [];

	rolePromises.push(userTarget.removeRole(communityRole));
	rolePromises.push(userTarget.removeRole(memberRole)); // remove member role if the muted poster had one                         
	rolePromises.push(userTarget.addRole(muteRole));  // remove voter role if the muted poster had one

	return Promise.all(rolePromises);
}


// sends arbitration notices to appropriate channels and tags user in question
function sendArbitrationNotices(userTarget) {
	let peerModChannel = userTarget.guild.channels.find("id", channels.braintrust);
	let arbitrationChannel = userTarget.guild.channels.find("id", channels.arbitration);

	let peerModMessage = "**" + userTarget + " has been muted.**"
	let arbitrationMessage = "Hello <@" + userTarget.id + ">, you have been placed in #arbitration. If you are @here, this means that three or more server members have voted to mute you from the primary chats. Please speak with a member of the staff when they are available to discuss why you have been muted by the community."

	let messagePromises = [];

	messagePromises.push(peerModChannel.send(peerModMessage))
	messagePromises.push(arbitrationChannel.send(arbitrationMessage));

	return Promise.all(messagePromises);
}


module.exports = {
	// mute guild member and send arbitration messages
	muteActions: function(muteGuildMember) {
		return muteUser(muteGuildMember)
		.then(() => {
			return sendArbitrationNotices(muteGuildMember);
		});
	},

	// checks if specified reaction is mute react
	checkIsMuteReact: function (reaction) {
		if (reaction.emoji.name === moderationConfig.muteReact) {
			return true;
		}
		return false;
	},


	// checks all votes on  a message reaction to see whether mute conditions are reached
	checkVoteConditions: function (reaction) {
		let muteThreshold = moderationConfig.muteVoteThreshold;
		let muteCheckPromises = [];

		// check member permissions for each vote
		reaction.users.forEach(function(voteUser) {
			muteCheckPromises.push(checkUserMutePermissions(reaction.message.guild, voteUser));
		})

		return Promise.all(muteCheckPromises).then(voteResults => {
			console.log('all votes counted');
			let voteCount = voteResults.filter(vote => (vote === true)).length; // count only valid votes

			// if vote count meets threshold, mute
			if (voteCount >= muteThreshold) {
				console.log('threshold of ' + muteThreshold + ' votes reached');
				return true;
			}
			// no mute
			else {
				console.log('threshold of ' +muteThreshold + ' votes not reached, only '+ voteCount + ' votes counted, taking no action');
				return false;
			}

		}).catch(console.error);
	}
}

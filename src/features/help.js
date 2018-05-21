const Discord = require('discord.js');
const commandInfo = require('../../data/commandInfo.json');

/**
 * Create a help message string based on commands/features available to specified server member's roles
 * @private
 * @param {Discord.GuildMember} guildMember Server member to generate available commands for
 * @returns {string} Help message text
 */
function createHelpMessage(guildMember) {
	return "Test: Greetings traveller, I am **Sibyl the Oracle**. I keep a close eye on the everyone and perform minor housekeeping tasks. \n\nYou can summon me using the following commands: \n`!help - displays this message` \n`!roll d20 - roll dice in d20 and other increments` \n`!ping - return latency in milliseconds` \n`!serverinfo - query server information`"
}

module.exports = {
	/**
	 * Send specified user a direct message containing bot help
	 * @param {Discord.User} discordUser Discord user to DM information to
	 * @param {Discord.Guild} discordGuild Discord server to base information upon
	 * @returns {Promise.<Discord.Message>} Promise resolving to the help message object
	 */
	sendDirectMessageHelp: function(discordUser, discordGuild) {
		return discordGuild.fetchMember(discordUser)
		.then(guildMember => {
			let helpMessage = createHelpMessage(guildMember);
			return discordUser.send(helpMessage);
		}).catch(console.error);
	}
}

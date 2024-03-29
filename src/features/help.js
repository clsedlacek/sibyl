const Discord = require('discord.js');
const roles = require('../../config/roles.json');
const commandInfo = require('../../data/commandInfo.json');
const roleUtils = require('../functions/roleUtils.js');

/**
 * Creates text describing a command based on data object passed in
 * @param {Object} commandData Command data object
 * @param {string} commandData.command Command string (for example, "!help")
 * @param {string} commandData.description Command description
 * @param {boolean|string} commandData.roleRequired If a role is required to use this command, specifies identifier from roles config; otherwise, false if no role required
 * @param {Array.<string>} commandData.examples Array of optional example strings showing how to use the command
 * @returns {string}
 */
function createCommandInfoText(commandData) {
	let infoText = `**${commandData.command}** - ${commandData.description}`;

	if (commandData.roleRequired) {
		infoText = infoText + ` *(Requires the ${roles[commandData.roleRequired]} role)*`;
	}

	if (commandData.examples.length) {
		infoText = infoText + '\nExamples:';
		commandData.examples.forEach(example => {
			infoText = infoText + `\n\`${example}\``;
		});
	}

	return infoText;
}

/**
 * Create a help message string based on commands/features available to specified server member's roles
 * @private
 * @param {Discord.GuildMember} guildMember Server member to generate available commands for
 * @returns {string} Help message text
 */
function createHelpMessage(guildMember, discordGuild) {
	let helpMessage = `Greetings, traveller. I am **Sibyl the Oracle**. I keep a close eye on everyone and perform minor housekeeping tasks for ${discordGuild.name}.\n\nYou can summon me using the following commands:\n\n`

	//return "Test: Greetings traveller, I am **Sibyl the Oracle**. I keep a close eye on the everyone and perform minor housekeeping tasks. \n\nYou can summon me using the following commands: \n`!help - displays this message` \n`!roll d20 - roll dice in d20 and other increments` \n`!ping - return latency in milliseconds` \n`!serverinfo - query server information`"

	commandInfo.commands.forEach(commandData => {
		if (!commandData.roleRequired || roleUtils.checkGuildMemberHasRole(guildMember, roles[commandData.roleRequired])) {
			helpMessage = helpMessage + createCommandInfoText(commandData);
			helpMessage = helpMessage + '\n\n';
		}
	});

	return helpMessage;
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
			let helpMessage = createHelpMessage(guildMember, discordGuild);
			return discordUser.send(helpMessage);
		}).catch(console.error);
	}
}

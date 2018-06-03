module.exports = {
	splitMessageDiscordLimit(message) {
		const discordMessageLimit = 1999;
		var reg = new RegExp(`[^]{0,${discordMessageLimit}}`, 'g');
		return message.match(reg);
	}
}

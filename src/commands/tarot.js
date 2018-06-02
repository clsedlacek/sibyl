const Discord = require('discord.js');
const tarot = require('../features/tarot/tarot.js');

module.exports = (client, message, args) => {
	console.log('Log', 'tarot spread requested...');

	if (args.length === 0) {
		tarot.sendFailMessage(message.channel);
		return
	};

	console.log('args:');
	console.dir(args);

	return tarot.sendTarotSpread(message.channel, args[0], args[1] || undefined);
};

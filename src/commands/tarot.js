const Discord = require('discord.js');
const tarot = require('../features/tarot/tarot.js');

module.exports = (client, message, args) => {
	console.log('Log', 'tarot spread requested...');

	if (args.length === 0) {
		tarot.sendHelpMessage(message.channel);
		return
	};

	console.log('args:');
	console.dir(args);

	if (args[0].toLowerCase() === "spread") {
		return tarot.sendTarotSpread(message.channel, args[1], args[2] || undefined);
	}
	else if (args[0].toLowerCase() === "card") {
		const deckName = args[1];
		const cardNumber = args[2];
		const cardName = args.slice(3).join(' ');;

		return tarot.sendTarotCard(message.channel, deckName, cardNumber, cardName);
	}
};

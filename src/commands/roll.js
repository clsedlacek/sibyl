const Discord = require('discord.js');
const dice = require('../features/dice.js');

module.exports = (client, message, args) => {
	console.log('Log', 'rolled...');

	if (args.length === 0) {
		dice.sendFailMessage(message.channel);
		return
	};

	let diceRoll = dice.rollDice(args.toString(), message.member);
	dice.sendDiceEmbed(diceRoll, message.channel);
};

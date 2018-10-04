const Discord = require('discord.js');
const d20 = require('d20');

class Dice {
	constructor(dice, guildMember) {
		this.dice = dice;
		this.owner = guildMember;
		this.result = null;
		console.log(`created ${dice} owned by ${guildMember.displayName}`);
	}

	roll() {
		this.result = d20.roll(this.dice);
		console.log(`${this.owner.displayName} rolled ${this.result}`);
	}
}

module.exports = {
	rollDice(diceString, guildMember) {
		const diceObj = new Dice(diceString, guildMember);
		diceObj.roll();
		return diceObj;
	},

	sendDiceEmbed(diceObj, guildChannel) {
		const embed = new Discord.RichEmbed()       // this will need to be updated to Discord.MessageEmbed once the Discord.js version is updated to version 12
		.setTitle(`${diceObj.owner.displayName} rolls ${diceObj.dice}!`)
		.setColor('AQUA')
		.setThumbnail("http://mtgs.me/s/discordbots/dicespill.jpg")
		.setDescription(`Result: ${diceObj.result}`)

		return guildChannel.send({ embed });
	},

	sendFailMessage(guildChannel) {
		return guildChannel.send(`Please specify a die type in one of the following formats: d*x*, *y*d*x*, *y*d*x*+/-*z*, or simply *x*.`)
	}
}

const TarotSpread = require('./Spread.js');
const TarotDeck = require('./Deck.js');
const tarotConfig = require('../../../config/tarot.json');
const attachmentUtils = require('../../functions/attachmentUtils.js');
const commandInfo = require('../../../data/commandInfo.json');

/**
 * Creates a string list of available spreads
 * @returns {string} String of available spreads listed as "id - spread name"
 */
function createSpreadList() {
	const spreads = [];
	let spreadList = "";

	Object.keys(tarotConfig.spreads).forEach(spreadId => {
		try {
			const loadedSpread = require(`${__basedir}/data/${tarotConfig.spreads[spreadId]}`);
			spreads.push(loadedSpread);
		}
		catch(e) {
			console.log(`error loading spread ${spreadId} at ${tarotConfig.spreads[spreadId]}: ${e}`);
		}
	});

	spreads.forEach(spreadData => {
		spreadList += `${spreadData.id} - ${spreadData.name}\n`;
	});

	return spreadList;
}


/**
 * Creates a string list of available decks
 * @returns {string} String of available decks listed as "id - deck name"
 */
function createDeckList() {
	const decks = [];
	let deckList = "";

	Object.keys(tarotConfig.decks).forEach(deckId => {
		try {
			const loadedDeck = require(`${__basedir}/data/${tarotConfig.decks[deckId]}`);
			decks.push(loadedDeck);
		}
		catch(e) {
			console.log(`error loading deck ${deckId} at ${tarotConfig.decks[deckId]}: ${e}`);
		}
	});

	decks.forEach(deckData => {
		deckList += `${deckData.id} - ${deckData.name}${tarotConfig.defaultDeck === deckData.id ? " (default)" : ""}\n`;
	});

	return deckList;
}


/**
 * Pads an ascii cell with dashes based on the cell content length
 * @param {Number|boolean} cellContents Contents of cell to pad
 * @returns {string} String containing padded cell contents
 */
function padCell(cellContents) {
	const digitLength = (cellContents + "").length;
	let paddedContents = "";

	if (!cellContents && (cellContents !== 0)) {
		paddedContents = "=====";
	}
	else {
		const dashes = (digitLength % 2 === 0) ? "odd" : "even";
		const prev = (dashes === "even" ? "==" : "=");
		const after = "==";
		paddedContents = `${prev}${cellContents}${after}`;
	}

	return paddedContents;
}


/**
 * Creates a message describing a tarot spread with ascii graphics
 * @param {TarotSpread} spread Tarot spread to describe
 * @returns {string} String message describing tarot spread
 */
function createSpreadMessage(spread) {
	let spreadMessage = "Here is your tarot spread. *Images coming soon.*\n```";

	for (let r = 0; r < spread.layoutBase.length; r++) {
		for (let c = 0; c <spread.layoutBase[r].length; c++) {
			let cellNumber = spread.layoutBase[r][c];
			spreadMessage += padCell(cellNumber);
		}
		spreadMessage += "\n";
	}

	spreadMessage += "\n";

	for (let i = 0; i < spread.spreadCards.length; i++) {
		let current = spread.spreadCards[i];
		spreadMessage += `${i+1}: ${current.getFullCardName()}\n`
	}

	spreadMessage += "```";

	return spreadMessage;
}


function createCardMessage(card) {
	let cardMessage = `Here is your requested card.\n**${card.getFullCardName()}**\n`;
	return cardMessage;
}



module.exports = {
	sendTarotSpread: function(guildChannel, spreadType=tarotConfig.defaultSpread, deckName=tarotConfig.defaultDeck) {
		const spread = TarotSpread.createTarotSpread(deckName, spreadType);
		const spreadMessage = createSpreadMessage(spread);
		return guildChannel.send(spreadMessage);
	},
	sendTarotCard: function(guildChannel, deckName, cardNumber, cardName) {
		const deck = TarotDeck.createTarotDeck(deckName);
		const requestedCard = deck.drawSpecifiedCard(cardName, cardNumber);
		const cardMessage = createCardMessage(requestedCard);
		return guildChannel.send(cardMessage, {files: [`${__publicdir}${requestedCard.image}`]});
	},
	sendHelpMessage:function (guildChannel) {
		let helpMessage = `I can perform a variety of tarot tasks for you.\n\nIf you wish for me to lay a spread, specify a spread and a deck via the \`!tarot spread\` command in the format \`!tarot spread [spread] [deck]\`. Example: \`!tarot spread three riderwaite\`.\n\nIf you wish for me to pull a specific card for you, specify a card and a deck via the \`!tarot card\` command in the format \`!tarot card [deck] [card number] [card name for major arcana or card suit]\`. Example: \`!tarot card riderwaite 0 The Fool\` or \`!tarot card riderwaite 5 Cups\`.\n\nTo see all cards in a deck, use the \`!tarot deck\` command in the format \`!tarot deck [deck]\`. Example: \`!tarot deck riderwaite\`.\nImages coming soon!\n\n**Spreads:**\n\`\`\``;
		helpMessage += createSpreadList() + "```\n**Decks**\n```";
		helpMessage += createDeckList() + "```";

		return guildChannel.send(helpMessage);
	}
}

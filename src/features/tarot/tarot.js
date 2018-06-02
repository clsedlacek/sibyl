const TarotSpread = require('./Spread.js');
const tarotConfig = require('../../../config/tarot.json');
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
			const loadedSpread = require(`../../../data/${tarotConfig.spreads[spreadId]}`);
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
			const loadedDeck = require(`../../../data/${tarotConfig.decks[deckId]}`);
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



module.exports = {
	sendTarotSpread: function(guildChannel, spreadType=tarotConfig.defaultSpread, deckName=tarotConfig.defaultDeck) {
		const spread = TarotSpread.createTarotSpread(deckName, spreadType);
		const spreadMessage = createSpreadMessage(spread);
		return guildChannel.send(spreadMessage);
	},
	sendHelpMessage:function (guildChannel) {
		let helpMessage = `I can lay tarot spreads for you. Please specify a spread and a deck via the \`!tarot\` command in the format \`!tarot [spread] [deck (optional)]\`. Example: \`!tarot three riderwaite\`. Images coming soon!\n\n**Spreads:**\n\`\`\``;
		helpMessage += createSpreadList() + "```\n**Decks**\n```";
		helpMessage += createDeckList() + "```";

		return guildChannel.send(helpMessage);
	}
}

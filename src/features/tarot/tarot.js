const TarotSpread = require('./Spread.js');
const tarotConfig = require('../../../config/tarot.json');

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

function createSpreadMessage(spread) {
	let spreadMessage = "```";

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
		console.log('spreadMessage');
		console.log(spreadMessage);
		return guildChannel.send(spreadMessage);
	}
}

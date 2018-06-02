const tarotConfig = require('../../../config/tarot.json');
const TarotDeck = require('./Deck.js');

module.exports = {
	sendTarotSpread: function(guildMember, spreadType, deckName=tarotConfig.defaultDeck) {
		const deckData = require(`../../../data/${tarotConfig.decks[deckName]}`)
		console.log('deckData:');
		console.dir(deckData);
		const deck = TarotDeck.createTarotDeck(deckData);
		console.log('deck:');
		console.dir(deck);
	}
}

module.exports.sendTarotSpread(null, null, 'riderwaite');

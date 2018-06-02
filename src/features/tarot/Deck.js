const TarotCard = require('./Card.js');

function createCardData(deckCards) {
	const cards = [];
	deckCards.forEach(cardData => {
		cards.push(TarotCard.createTarotCard(cardData));
	});
	return cards;
}

class TarotDeck {
	constructor(deckData) {
		this.name = deckData.name;
		this.cardsBase = createCardData(deckData.cards); // reference for all total cards in deck
		this.cardsRemaining = [...this.cardsBase]; // shows cards currently "in the deck" for if someone is using it
	}
}

module.exports = {
	TarotDeck,
	createTarotDeck: function(deckData) {
		return new TarotDeck(deckData);
	}
}

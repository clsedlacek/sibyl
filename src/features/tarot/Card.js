class TarotCard {
	constructor(cardData) {
		this.number = cardData.number;
		this.arcana = cardData.arcana;
		this.name = cardData.name;
		this.image = cardData.image;
	}
	getFullCardName() {
		if (this.arcana.toLowerCase === 'major') {
			return `${this.number}: ${this.name}`
		}
		else {
			return `${this.number} of ${this.name}`
		}
	}
}

module.exports = {
	TarotCard,
	createTarotCard: function(cardData) {
		return new TarotCard(cardData);
	},
	createRandomTarotCard: function(deckData) {
		const deckMaxBound = deckData.cards.length;
		const cardNumber = Math.floor(Math.random()*deckMaxBound);
		const randomCardData = deckData.cards[cardNumber];
		return module.exports.createTarotCard(randomCardData);
	}
}

const exec = require('child_process').exec;

class SpreadImage {
	constructor(spread) {
		this.spread = spread;
		this.imageGenerated;
	}

	generateImage(saveLocation) {
		const tempSavePath = `${__publicdir}/images/tarot/spreads/temp${Math.floor(Math.random()*1000000000)}.png`;
		const finalSavePath = `${__publicdir}/images/tarot/spreads/final${Math.floor(Math.random()*1000000000)}.png`;
		const commands = [
			'gm',
			'convert',
			'-size', `${this.spread.imageBase.size.width+500}x${this.spread.imageBase.size.height}`,
			`xc:'#FFFFFF'`
		];

		this.spread.imageBase.cards.forEach((cardImageData, index) => {
			const currentCard = this.spread.spreadCards[index];
			commands.push('-resize');
			commands.push(`${cardImageData.size.width || ''}x${cardImageData.size.height || ''}`);
			commands.push('-page');
			commands.push(`${cardImageData.size.width || ''}x${cardImageData.size.height || ''}+${cardImageData.placement.x}+${cardImageData.placement.y}`);
			commands.push(`${__publicdir}${currentCard.image}`);
		});


		this.spread.imageBase.cards.forEach((cardImageData, index) => {
			const currentCard = this.spread.spreadCards[index];
			commands.push('-stroke black');
			commands.push('-fill black');
			commands.push('-pointsize 16');
			commands.push('-draw');
			commands.push(`'text ${cardImageData.placement.x},${cardImageData.placement.y+cardImageData.size.height+20} "${cardImageData.label}"'`);
			commands.push('-pointsize 20');
			commands.push('-draw');
			commands.push(`'text ${this.spread.imageBase.size.width+100},${(index*40)+40} "${cardImageData.label} [${currentCard.getFullCardName()}]"'`);
		});

		commands.push('-flatten');
		commands.push(finalSavePath);

		return new Promise((resolve, reject) => {
			exec(commands.join(' '), (err, stdout, stderr) => {
				if (err) {
					console.error('generateImage error: '+err);
					reject(err);
				}
				else {
					resolve(finalSavePath);
				}
			});
		});
	}
}

module.exports = {
	createSpreadImage: function(spread) {
		const spreadImage = new SpreadImage(spread);
		return spreadImage.generateImage();
	}
}

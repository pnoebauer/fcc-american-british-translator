const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require('./american-to-british-titles.js');
const britishOnly = require('./british-only.js');

class Translator {
	americanToBritish(text) {
		const americanToBritishMap = {
			...americanOnly,
			...americanToBritishSpelling,
			...americanToBritishTitles,
		};

		Object.keys(americanToBritishMap).forEach(americanWord => {
			const britishWord = americanToBritishMap[americanWord];
			text = text.replace(new RegExp(`\\b${americanWord}\\b`, 'g'), britishWord);
		});
		console.log(text);
	}

	britishToAmerican(text) {
		const americanToBritishMap = {
			...americanToBritishSpelling,
			...americanToBritishTitles,
		};

		Object.keys(britishOnly).forEach(britishWord => {
			const americanTranslation = britishOnly[britishWord];
			text = text.replace(new RegExp(`\\b${britishWord}\\b`, 'g'), americanTranslation);
		});
		Object.keys(americanToBritishMap).forEach(americanWord => {
			const britishWord = americanToBritishMap[americanWord];
			text = text.replace(new RegExp(`\\b${britishWord}\\b`, 'g'), americanWord);
		});
		console.log(text);
	}
}

module.exports = Translator;

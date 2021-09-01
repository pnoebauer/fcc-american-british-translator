const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require('./american-to-british-titles.js');
const britishOnly = require('./british-only.js');

class Translator {
	translateTime(text, locale) {
		const usedTimeSeparator = locale === 'american-to-british' ? ':' : '.';
		const newTimeSeparator = locale === 'american-to-british' ? '.' : ':';

		const hr24OptLeadZero = `([0-9]|0[0-9]|1[0-9]|2[0-3])${usedTimeSeparator}[0-5][0-9]`;
		const times = text.match(new RegExp(hr24OptLeadZero, 'g'));
		console.log(hr24OptLeadZero, times);

		if (!times) {
			return text;
		}

		times.forEach(time => {
			const convertedTime = time.replace(usedTimeSeparator, newTimeSeparator);
			text = text.replace(time, convertedTime);
		});

		return text;
	}

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
		// console.log(text);

		// // const hr24OptLeadZero = /([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]/g;
		// // console.log(text.match(/(10|11|12|[1-9]):[0-5][0-9]/g));
		// // console.log(text.match(hr24OptLeadZero));
		// // const times = text.match(hr24OptLeadZero);

		// // const hr24OptLeadZero = /([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]/g;
		// const hr24OptLeadZero = `([0-9]|0[0-9]|1[0-9]|2[0-3])${':'}[0-5][0-9]`;
		// const times = text.match(new RegExp(hr24OptLeadZero, 'g'));

		// times.forEach(americanTime => {
		// 	const britishTime = americanTime.replace(':', '.');
		// 	text = text.replace(americanTime, britishTime);
		// });

		text = this.translateTime(text, 'american-to-british');

		console.log(text);

		return text;
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
		// console.log(text);

		text = this.translateTime(text, 'british-to-american');

		return text;
	}
}

module.exports = Translator;

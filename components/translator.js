const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require('./american-to-british-titles.js');
const britishOnly = require('./british-only.js');

const americanTitles = Object.keys(americanToBritishTitles);
const britishTitles = Object.values(americanToBritishTitles);

class Translator {
	replacerTitle(str, words, replaced) {
		words.forEach((word, i) => {
			// positive lookahead and lookbehind:
			// 		check that before word(title) there is either nothing or whitespace, ., ', ""
			const regex = new RegExp(`(?<=^|[.'"\\s])${word}(?=[.'"\\s]|$)`, 'gi');
			replaced[i] = replaced[i].replace(replaced[i][0], replaced[i][0].toUpperCase());
			str = str.replace(regex, `<span class="highlight">${replaced[i]}</span>`);
		});

		return str;
	}

	translateTime(text, locale) {
		const usedTimeSeparator = locale === 'american-to-british' ? ':' : '.';
		const newTimeSeparator = locale === 'american-to-british' ? '.' : ':';

		const hr24OptLeadZero = `\\b([0-9]|0[0-9]|1[0-9]|2[0-3])${usedTimeSeparator}([0-5][0-9])\\b`;
		const times = text.match(new RegExp(hr24OptLeadZero, 'g'));
		// console.log(hr24OptLeadZero, times);

		if (!times) {
			return text;
		}

		times.forEach(time => {
			const convertedTime = time.replace(usedTimeSeparator, newTimeSeparator);
			// text = text.replace(time, convertedTime);
			text = text.replace(time, `<span class="highlight">${convertedTime}</span>`);
		});

		return text;
	}

	americanToBritish(text) {
		const americanToBritishMap = {
			...americanOnly,
			...americanToBritishSpelling,
			// ...americanToBritishTitles,
		};

		Object.keys(americanToBritishMap).forEach(americanWord => {
			const britishWord = americanToBritishMap[americanWord];

			// if (text.search(new RegExp(`\\b${americanWord}\\b`, 'i')) >= 0) {
			// console.log(americanWord);
			// text = text.replace(new RegExp(`\\b${americanWord}\\b`, 'gi'), britishWord);
			// }

			text = text.replace(
				new RegExp(`\\b${americanWord}\\b`, 'gi'),
				`<span class="highlight">${britishWord}</span>`
			);
		});

		// Object.keys(americanToBritishTitles).forEach(americanTitle => {
		// 	const britishTitle = americanToBritishTitles[americanTitle];

		// 	// use of britishTitle in regex not americanTitle as the '.' is already included in the regex
		// 	// find all titles followed by a '.'; return only the '.'
		// 	text = text.replace(new RegExp(`(?<=${britishTitle})\\.`, 'i'), '');
		// });

		text = this.replacerTitle(text, americanTitles, britishTitles);

		text = this.translateTime(text, 'american-to-british');

		// console.log(text);

		return text;
	}

	// 'A dr Grosh will see you now.'.search(/\bDr\b[^.]/i)
	britishToAmerican(text) {
		Object.keys(britishOnly).forEach(britishWord => {
			const americanTranslation = britishOnly[britishWord];
			// text = text.replace(new RegExp(`\\b${britishWord}\\b`, 'gi'), americanTranslation);
			text = text.replace(
				new RegExp(`\\b${britishWord}\\b`, 'gi'),
				`<span class="highlight">${americanTranslation}</span>`
			);
		});
		Object.keys(americanToBritishSpelling).forEach(americanWord => {
			const britishWord = americanToBritishSpelling[americanWord];
			// text = text.replace(new RegExp(`\\b${britishWord}\\b`, 'gi'), americanWord);
			text = text.replace(
				new RegExp(`\\b${britishWord}\\b`, 'gi'),
				`<span class="highlight">${americanWord}</span>`
			);
		});

		// Object.keys(americanToBritishTitles).forEach(americanTitle => {
		// 	const britishTitle = americanToBritishTitles[americanTitle];

		// 	// find all titles followed by a whitespace'; return only the whitespace
		// 	text = text.replace(new RegExp(`(?<=${britishTitle})\\s`, 'i'), '. ');
		// });

		text = this.replacerTitle(text, britishTitles, americanTitles);

		// console.log(text);

		text = this.translateTime(text, 'british-to-american');

		return text;
	}
}

module.exports = Translator;

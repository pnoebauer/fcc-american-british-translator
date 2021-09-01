'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {
	const translator = new Translator();

	app.route('/api/translate').post((req, res) => {
		console.log(req.body);
		const {text, locale} = req.body;

		if (text === undefined || locale === undefined) {
			console.log('Required field(s) missing');
			return res.json({error: 'Required field(s) missing'});
		}
		if (!text.length) {
			console.log('No text to translate');
			return res.json({error: 'No text to translate'});
		}

		if (locale === 'american-to-british') {
			const translation = translator.americanToBritish(text);

			if (translation === text) {
				console.log('Everything looks good to me!');
				return res.json({text, translation: 'Everything looks good to me!'});
			}
			console.log({text, translation});
			return res.json({text, translation});
		} else if (locale === 'british-to-american') {
			const translation = translator.britishToAmerican(text);

			if (translation === text) {
				console.log('Everything looks good to me!');
				return res.json({text, translation: 'Everything looks good to me!'});
			}
			console.log({text, translation});
			return res.json({text, translation});
		} else {
			console.log('Invalid value for locale field');
			return res.json({error: 'Invalid value for locale field'});
		}
	});
};

'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {
	const translator = new Translator();

	app.route('/api/translate').post((req, res) => {
		console.log(req.body);
		const {text, locale} = req.body;

		if (locale === 'american-to-british') {
			const translation = translator.americanToBritish(text);

			return res.json({text, translation});
		} else if (locale === 'british-to-american') {
			const translation = translator.britishToAmerican(text);

			return res.json({text, translation});
		}
	});
};

require('dotenv').config();
const express = require('express');

const expect = require('chai').expect;
const cors = require('cors');

const fccTestingRoutes = require('./routes/fcctesting.js');
const runner = require('./test-runner');
const userRoutes = require('./routes/api.js');

// const Translator = require('./components/translator.js');
// const translator = new Translator();

// translator.americanToBritish(`Mangoes are my favorite driver's license.`);
// translator.britishToAmerican(`We watched our favourite footie match for a while.`);

// const americanOnly = require('./components/american-only.js');
// const americanToBritishSpelling = require('./components/american-to-british-spelling.js');
// const americanToBritishTitles = require('./components/american-to-british-titles.js');
// const britishOnly = require('./components/british-only.js');

// function americanToBritish(text) {
// 	// console.log(text.indexOf('favorite'), 'favorite');
// 	// console.log(text.indexOf('driver`s license'), 'driver`s license');

// 	const americanToBritishMap = {
// 		...americanOnly,
// 		...americanToBritishSpelling,
// 		...americanToBritishTitles,
// 	};

// 	Object.keys(americanToBritishMap).forEach((americanWord, index) => {
// 		// // console.log(americanWord);

// 		// // does not work on connected phrases, e.g. driver's license
// 		// // if (text.indexOf(americanWord) !== -1) {
// 		// // 	console.log(text.indexOf(americanWord), americanWord);
// 		// // }
// 		// // if one of the american words occurs in the provided text
// 		// if (text.search(new RegExp(`\\b${americanWord}\\b`)) >= 0) {
// 		// 	console.log('Found it!', americanWord, text.search(new RegExp(`\\b${americanWord}\\b`)));

// 		// 	text = text.replace(new RegExp(`\\b${americanWord}\\b`, 'g'), americanToBritishMap[americanWord]);
// 		// 	console.log(text);
// 		// }
// 		const britishWord = americanToBritishMap[americanWord];

// 		text = text.replace(new RegExp(`\\b${americanWord}\\b`, 'g'), britishWord);
// 	});
// 	console.log(text);
// }

// function britishToAmerican(text) {
// 	// console.log(text.indexOf('favorite'), 'favorite');
// 	// console.log(text.indexOf('driver`s license'), 'driver`s license');

// 	const americanToBritishMap = {
// 		...americanToBritishSpelling,
// 		...americanToBritishTitles,
// 	};

// 	Object.keys(britishOnly).forEach((word, index) => {
// 		text = text.replace(new RegExp(`\\b${word}\\b`, 'g'), britishOnly[word]);
// 	});

// 	Object.keys(americanToBritishMap).forEach((americanWord, index) => {
// 		const britishWord = americanToBritishMap[americanWord];

// 		// if (text.search(new RegExp(`\\b${britishWord}\\b`)) >= 0) {
// 		// 	console.log(
// 		// 		'Found it!',
// 		// 		britishWord,
// 		// 		americanWord,
// 		// 		text.search(
// 		// 			new RegExp(`\\b${britishWord}\\b`),
// 		// 			text.replace(new RegExp(`\\b${britishWord}\\b`, 'g'), americanWord),
// 		// 			'favourite'.replace(new RegExp(`\\b${britishWord}\\b`, 'g'), americanWord)
// 		// 		)
// 		// 	);
// 		text = text.replace(new RegExp(`\\b${britishWord}\\b`, 'g'), americanWord);
// 		// }
// 	});

// 	console.log(text);
// }

// // americanToBritish('Mangoes are my favorite fruit.');
// americanToBritish(`Mangoes are my favorite driver's license.`);
// britishToAmerican(`We watched our favourite footie match for a while.`);

const app = express();

app.use('/public', express.static(process.cwd() + '/public'));
app.use(cors({origin: '*'})); //For FCC testing purposes only

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Index page (static HTML)
app.route('/').get(function (req, res) {
	res.sendFile(process.cwd() + '/views/index.html');
});

//For FCC testing purposes
fccTestingRoutes(app);

// User routes
userRoutes(app);

// 404 Not Found Middleware
app.use(function (req, res, next) {
	res.status(404).type('text').send('Not Found');
});

const portNum = process.env.PORT || 3000;

// Start our server and tests!
app.listen(portNum, () => {
	console.log(`Listening on port ${portNum}`);
	if (process.env.NODE_ENV === 'test') {
		console.log('Running Tests...');
		setTimeout(function () {
			try {
				runner.run();
			} catch (error) {
				console.log('Tests are not valid:');
				console.error(error);
			}
		}, 1500);
	}
});

module.exports = app; // For testing

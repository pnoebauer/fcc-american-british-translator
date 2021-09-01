const chai = require('chai');
const assert = chai.assert;

const Translator = require('../components/translator.js');
const translator = new Translator();

suite('Unit Tests', () => {
	test('Mangoes are my favorite fruit.', function () {
		assert.equal(
			translator.americanToBritish('Mangoes are my favorite fruit.'),
			`Mangoes are my <span class="highlight">favourite</span> fruit.`
		);
	});
	test('I ate yogurt for breakfast.', function () {
		assert.equal(
			translator.americanToBritish('I ate yogurt for breakfast.'),
			`I ate <span class="highlight">yoghurt</span> for breakfast.`
		);
	});
	test(`We had a party at my friend's condo.`, function () {
		assert.equal(
			translator.americanToBritish(`We had a party at my friend's condo.`),
			`We had a party at my friend's <span class="highlight">flat</span>.`
		);
	});
	test(`Can you toss this in the trashcan for me?`, function () {
		assert.equal(
			translator.americanToBritish(`Can you toss this in the trashcan for me?`),
			`Can you toss this in the <span class="highlight">bin</span> for me?`
		);
	});
	test(`The parking lot was full.`, function () {
		assert.equal(
			translator.americanToBritish(`The parking lot was full.`),
			`The <span class="highlight">car park</span> was full.`
		);
	});
	test(`Like a high tech Rube Goldberg machine.`, function () {
		assert.equal(
			translator.americanToBritish(`Like a high tech Rube Goldberg machine.`),
			`Like a high tech <span class="highlight">Heath Robinson device</span>.`
		);
	});
	test(`To play hooky means to skip class or work.`, function () {
		assert.equal(
			translator.americanToBritish(`To play hooky means to skip class or work.`),
			`To <span class="highlight">bunk off</span> means to skip class or work.`
		);
	});
	test(`No Mr. Bond, I expect you to die.`, function () {
		assert.equal(
			translator.americanToBritish(`No Mr. Bond, I expect you to die.`),
			`No <span class="highlight">Mr</span> Bond, I expect you to die.`
		);
	});
	test(`Dr. Grosh will see you now.`, function () {
		assert.equal(
			translator.americanToBritish(`Dr. Grosh will see you now.`),
			`<span class="highlight">Dr</span> Grosh will see you now.`
		);
	});
	test(`Lunch is at 12:15 today.`, function () {
		assert.equal(
			translator.americanToBritish(`Lunch is at 12:15 today.`),
			`Lunch is at <span class="highlight">12.15</span> today.`
		);
	});
	test(`We watched the footie match for a while.`, function () {
		assert.equal(
			translator.britishToAmerican(`We watched the footie match for a while.`),
			`We watched the <span class="highlight">soccer</span> match for a while.`
		);
	});
	test(`Paracetamol takes up to an hour to work.`, function () {
		assert.equal(
			translator.britishToAmerican(`Paracetamol takes up to an hour to work.`),
			`<span class="highlight">Tylenol</span> takes up to an hour to work.`
		);
	});
	test(`First, caramelise the onions.`, function () {
		assert.equal(
			translator.britishToAmerican(`First, caramelise the onions.`),
			`First, <span class="highlight">caramelize</span> the onions.`
		);
	});
	test(`I spent the bank holiday at the funfair.`, function () {
		assert.equal(
			translator.britishToAmerican(`I spent the bank holiday at the funfair.`),
			`I spent the <span class="highlight">public holiday</span> at the <span class="highlight">carnival</span>.`
		);
	});
	test(`I had a bicky then went to the chippy.`, function () {
		assert.equal(
			translator.britishToAmerican(`I had a bicky then went to the chippy.`),
			`I had a <span class="highlight">cookie</span> then went to the <span class="highlight">fish-and-<span class="highlight">fish-and-chip shop</span></span>.`
		);
	});
	test(`I've just got bits and bobs in my bum bag.`, function () {
		assert.equal(
			translator.britishToAmerican(`I've just got bits and bobs in my bum bag.`),
			`I've just got <span class="highlight">odds and ends</span> in my <span class="highlight">fanny pack</span>.`
		);
	});
	test(`The car boot sale at Boxted Airfield was called off.`, function () {
		assert.equal(
			translator.britishToAmerican(
				`The car boot sale at Boxted Airfield was called off.`
			),
			`The <span class="highlight">swap meet</span> at Boxted Airfield was called off.`
		);
	});
	test(`Have you met Mrs Kalyani?`, function () {
		assert.equal(
			translator.britishToAmerican(`Have you met Mrs Kalyani?`),
			`Have you met <span class="highlight">Mrs.</span> Kalyani?`
		);
	});
	test(`Prof Joyner of King's College, London.`, function () {
		assert.equal(
			translator.britishToAmerican(`Prof Joyner of King's College, London.`),
			`<span class="highlight">Prof.</span> Joyner of King's College, London.`
		);
	});
	test(`Tea time is usually around 4 or 4.30.`, function () {
		assert.equal(
			translator.britishToAmerican(`Tea time is usually around 4 or 4.30.`),
			`Tea time is usually around 4 or <span class="highlight">4:30</span>.`
		);
	});
	test(`Highlight translation in Mangoes are my favorite fruit.`, function () {
		assert.include(
			translator.americanToBritish(`Mangoes are my favorite fruit.`),
			`<span class="highlight">favourite</span>`,
			'translation contains substring with highlighted span'
		);
	});
	test(`Highlight translation in I ate yogurt for breakfast.`, function () {
		assert.include(
			translator.americanToBritish(`I ate yogurt for breakfast.`),
			`<span class="highlight">yoghurt</span>`,
			'translation contains substring with highlighted span'
		);
	});
	test(`Highlight translation in We watched the footie match for a while.`, function () {
		assert.include(
			translator.britishToAmerican(`We watched the footie match for a while.`),
			`<span class="highlight">soccer</span>`,
			'translation contains substring with highlighted span'
		);
	});
	test(`Highlight translation in Paracetamol takes up to an hour to work.`, function () {
		assert.include(
			translator.britishToAmerican(`Paracetamol takes up to an hour to work.`),
			`<span class="highlight">Tylenol</span>`,
			'translation contains substring with highlighted span'
		);
	});
});

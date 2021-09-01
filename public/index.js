const translateHandler = async () => {
	const textArea = document.getElementById('text-input');
	const localeArea = document.getElementById('locale-select');
	const errorArea = document.getElementById('error-msg');
	const translatedArea = document.getElementById('translated-sentence');

	const stuff = {text: textArea.value, locale: localeArea.value};
	errorArea.innerText = '';
	translatedArea.innerText = '';

	const data = await fetch('/api/translate', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-type': 'application/json',
		},
		body: JSON.stringify(stuff),
	});

	const parsed = await data.json();
	if (parsed.error) {
		errorArea.innerText = JSON.stringify(parsed);
		return;
	}

	// let htmlString = parsed.translation;

	// const translationArr = parsed.translation.split(' ');
	// // console.log(translationArr);
	// const textArr = parsed.text.split(' ');

	// translationArr.forEach(word => {
	// 	// console.log(parsed.text, !textArr.includes(word), word);
	// 	if (!textArr.includes(word)) {
	// 		console.log(word, htmlString);
	// 		// htmlString = htmlString.replace(
	// 		// 	new RegExp(`\\b${word}\\b`),
	// 		// 	`<span class="highlight">${word}</span>`
	// 		// );

	// 		// str.match(/\bcosts(?!<\/span>)/g) )

	// 		htmlString = htmlString.replace(
	// 			new RegExp(`\\b${word}(?!<\/span>)`),
	// 			`<span class="highlight">${word}</span>`
	// 		);
	// 	}
	// });

	// // console.log(htmlString);

	// if (parsed.translation === 'Everything looks good to me!') {
	// 	translatedArea.innerHTML = parsed.translation;
	// 	return;
	// }

	// translatedArea.innerHTML = htmlString;

	translatedArea.innerHTML = parsed.translation;

	return;
};

document.getElementById('translate-btn').addEventListener('click', translateHandler);

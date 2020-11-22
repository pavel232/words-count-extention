import { most1000wordsSet } from './most1000words.js';

const wordsCount = document.getElementById('words-count');
const wordsUniq = document.getElementById('words-uniq');

chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
	chrome.tabs.sendMessage(tabs[0].id, 'start', calcWords);
});

function calcWords(wordsArray = []) {
	wordsCount.innerHTML = wordsArray.length;

	const wordsUniqArr = Array.from(new Set(wordsArray));
	wordsUniq.innerHTML = wordsUniqArr.length;

	const uniqWordsPercent = calcUniqWords(wordsUniqArr, most1000wordsSet);
	drawGraph([uniqWordsPercent, 100 - uniqWordsPercent]);
}



function calcUniqWords(wordsArr, mostPopularWordsSet) {
	let uniqCount = 0;

	wordsArr.forEach(e => {
		if(mostPopularWordsSet.has(e)) {
			uniqCount++;
		}
	});

	return Math.floor(uniqCount / wordsArr.length * 100);
}

// Построение графика с помощью библиотеки Chart.js
function drawGraph(data) {
	const ctx = document.getElementById('myChart').getContext('2d');
	let myChart = new Chart(ctx, {
		type: 'pie',
		data: {
			labels: ['Слова входят в топ 1000, %', 'Остальные слова, %'],
			datasets: [{
				label: '# of Votes',
				data: data,
				backgroundColor: [
					'rgba(54, 162, 235)',
					'rgba(255, 99, 132)'
				]
			}]
		},
		option: {
			cutoutPercentage: 50
		}
	});
}

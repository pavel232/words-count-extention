const wordsCount = document.getElementById('words-count');
const wordsUnic = document.getElementById('words-unic');

function setWordsCount(value) {
	wordsCount.innerHTML = value;
}

chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
	chrome.tabs.sendMessage(tabs[0].id, 'start', setWordsCount);
});

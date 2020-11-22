chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const bodyText = document.body.innerText;
  const wordsCount = bodyText.match(/\b\w+\b/g);

  sendResponse(wordsCount);
});
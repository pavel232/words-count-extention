const body = document.body;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  sendResponse(10);
});
// Background script to handle badge updates
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'plugin-detected') {
    // Update badge based on detection
    if (message.detected) {
      chrome.action.setBadgeText({
        text: '✓',
        tabId: sender.tab?.id
      });
      chrome.action.setBadgeBackgroundColor({
        color: '#10b981',
        tabId: sender.tab?.id
      });
    } else {
      chrome.action.setBadgeText({
        text: '',
        tabId: sender.tab?.id
      });
    }
  }
  
  return true;
});

// Clear badge when tab is updated
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'loading') {
    chrome.action.setBadgeText({
      text: '',
      tabId: tabId
    });
  }
});

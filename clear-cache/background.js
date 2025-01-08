chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'clearAllData') {
    clearData(request.options);
    sendResponse({ success: true });
  } else if (request.action === 'clearCurrentSite') {
    clearSiteData(request.options, request.url);
    sendResponse({ success: true });
  }
  return true;
});

async function clearData(options) {
  const removeOptions = {
    since: 0
  };

  if (options.cache) {
    await chrome.browsingData.removeCache(removeOptions);
  }
  if (options.cookies) {
    await chrome.browsingData.removeCookies(removeOptions);
  }

  if (options.localStorage || options.sessionStorage) {
    // 清除存储数据
    chrome.tabs.query({}, function(tabs) {
      tabs.forEach(tab => {
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          function: (opts) => {
            if (opts.localStorage) localStorage.clear();
            if (opts.sessionStorage) sessionStorage.clear();
          },
          args: [options]
        }).catch(() => {});
      });
    });
  }
}

async function clearSiteData(options, origin) {
  const removeOptions = {
    since: 0,
    origins: [origin]
  };

  if (options.cache) {
    await chrome.browsingData.removeCache(removeOptions);
  }
  if (options.cookies) {
    await chrome.browsingData.removeCookies(removeOptions);
  }

  if (options.localStorage || options.sessionStorage) {
    chrome.tabs.query({url: origin + '/*'}, function(tabs) {
      tabs.forEach(tab => {
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          function: (opts) => {
            if (opts.localStorage) localStorage.clear();
            if (opts.sessionStorage) sessionStorage.clear();
          },
          args: [options]
        }).catch(() => {});
      });
    });
  }
}

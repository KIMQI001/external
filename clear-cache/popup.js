document.addEventListener('DOMContentLoaded', function() {
  const clearDataBtn = document.getElementById('clearData');
  const clearCurrentSiteBtn = document.getElementById('clearCurrentSite');
  const status = document.getElementById('status');

  // 获取选项状态
  function getOptions() {
    return {
      cache: document.getElementById('cache').checked,
      cookies: document.getElementById('cookies').checked,
      localStorage: document.getElementById('localStorage').checked,
      sessionStorage: document.getElementById('sessionStorage').checked
    };
  }

  // 显示状态信息
  function showStatus(message, isError = false) {
    status.textContent = message;
    status.style.display = 'block';
    status.className = isError ? 'error' : 'success';
    setTimeout(() => {
      status.style.display = 'none';
    }, 3000);
  }

  // 清除所有数据
  clearDataBtn.addEventListener('click', async () => {
    const options = getOptions();
    try {
      // 发送消息到background script
      const response = await chrome.runtime.sendMessage({
        action: 'clearAllData',
        options: options
      });
      showStatus('数据清除成功！');
    } catch (error) {
      showStatus('清除失败：' + error.message, true);
    }
  });

  // 清除当前网站数据
  clearCurrentSiteBtn.addEventListener('click', async () => {
    const options = getOptions();
    try {
      const [tab] = await chrome.tabs.query({active: true, currentWindow: true});
      const response = await chrome.runtime.sendMessage({
        action: 'clearCurrentSite',
        options: options,
        url: new URL(tab.url).origin
      });
      showStatus('当前网站数据清除成功！');
    } catch (error) {
      showStatus('清除失败：' + error.message, true);
    }
  });
});

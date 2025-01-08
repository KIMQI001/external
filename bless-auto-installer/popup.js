const BLESS_EXTENSION_ID = 'pljbjcehnhcnofmkdbjolghdcjnmekia';

document.getElementById('reinstall').addEventListener('click', async () => {
  const status = document.getElementById('status');
  try {
    // 先卸载现有的插件
    await chrome.management.uninstall(BLESS_EXTENSION_ID, { showConfirmDialog: false });
    status.textContent = '已卸载旧版本，正在安装新版本...';
    status.className = 'success';

    // 打开 Chrome 商店安装页面
    chrome.tabs.create({
      url: `https://chromewebstore.google.com/detail/bless/${BLESS_EXTENSION_ID}`
    });
  } catch (error) {
    if (error.message.includes('not found')) {
      // 如果插件不存在，直接打开安装页面
      chrome.tabs.create({
        url: `https://chromewebstore.google.com/detail/bless/${BLESS_EXTENSION_ID}`
      });
      status.textContent = '正在打开安装页面...';
      status.className = 'success';
    } else {
      status.textContent = '操作失败：' + error.message;
      status.className = 'error';
    }
  }
});

document.getElementById('checkStatus').addEventListener('click', async () => {
  const status = document.getElementById('status');
  try {
    const extension = await chrome.management.get(BLESS_EXTENSION_ID);
    status.textContent = `Bless 插件状态：${extension.enabled ? '已启用' : '已禁用'} (版本 ${extension.version})`;
    status.className = 'success';
  } catch (error) {
    status.textContent = 'Bless 插件未安装';
    status.className = 'error';
  }
});

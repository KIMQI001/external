// 监听插件安装状态
chrome.management.onInstalled.addListener((info) => {
  if (info.id === 'pljbjcehnhcnofmkdbjolghdcjnmekia') {
    console.log('Bless 插件安装成功');
  }
});

// 监听插件卸载状态
chrome.management.onUninstalled.addListener((id) => {
  if (id === 'pljbjcehnhcnofmkdbjolghdcjnmekia') {
    console.log('Bless 插件已卸载');
  }
});

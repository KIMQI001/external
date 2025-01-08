// 已知的 Bless 扩展 ID 列表
const BLESS_EXTENSION_IDS = [
    'pljbjcehnhcnofmkdbjolghdcjnmekia',  // 原始ID
    'plibcehnhcnofmkdbjolghdcjnmekia'    // 新ID
];

async function checkAndInstallBless() {
    const status = document.getElementById('status');
    
    // 检查所有可能的扩展ID
    for (const extensionId of BLESS_EXTENSION_IDS) {
        try {
            await chrome.management.get(extensionId);
            // 如果找到了扩展，就卸载它
            await chrome.management.uninstall(extensionId, { showConfirmDialog: false });
            status.textContent = '已卸载旧版本，正在安装新版本...';
            status.className = 'success';
        } catch (error) {
            console.log(`Extension ${extensionId} not found or error:`, error);
        }
    }

    // 打开 Chrome 商店安装页面
    chrome.tabs.create({
        url: 'https://chromewebstore.google.com/detail/bless/pljbjcehnhcnofmkdbjolghdcjnmekia'
    });
    status.textContent = '正在打开安装页面...';
    status.className = 'success';
}

document.getElementById('reinstall').addEventListener('click', checkAndInstallBless);

document.getElementById('checkStatus').addEventListener('click', async () => {
    const status = document.getElementById('status');
    let found = false;

    for (const extensionId of BLESS_EXTENSION_IDS) {
        try {
            const extension = await chrome.management.get(extensionId);
            status.textContent = `Bless 插件状态：${extension.enabled ? '已启用' : '已禁用'} (版本 ${extension.version})`;
            status.className = 'success';
            found = true;
            break;
        } catch (error) {
            console.log(`Extension ${extensionId} not found or error:`, error);
        }
    }

    if (!found) {
        status.textContent = 'Bless 插件未安装';
        status.className = 'error';
    }
});

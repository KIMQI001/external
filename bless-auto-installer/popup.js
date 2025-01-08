// 已知的 Bless 扩展 ID 列表
const BLESS_EXTENSION_IDS = [
    'pljbjcehnhcnofmkdbjolghdcjnmekia',  // 原始ID
    'plibcehnhcnofmkdbjolghdcjnmekia'    // 新ID
];

function showStatus(message, isError = false) {
    const status = document.getElementById('status');
    status.textContent = message;
    status.className = isError ? 'error' : 'success';
    status.style.display = 'block';
    setTimeout(() => {
        status.style.display = 'none';
    }, 3000);
}

async function installBless() {
    chrome.tabs.create({
        url: 'https://chromewebstore.google.com/detail/bless/pljbjcehnhcnofmkdbjolghdcjnmekia'
    });
    showStatus('正在打开安装页面...');
}

async function reinstallBless() {
    let uninstalled = false;
    
    // 检查所有可能的扩展ID
    for (const extensionId of BLESS_EXTENSION_IDS) {
        try {
            await chrome.management.get(extensionId);
            // 如果找到了扩展，就卸载它
            await chrome.management.uninstall(extensionId, { showConfirmDialog: false });
            uninstalled = true;
        } catch (error) {
            console.log(`Extension ${extensionId} not found or error:`, error);
        }
    }

    if (uninstalled) {
        showStatus('已卸载旧版本，正在打开安装页面...');
    } else {
        showStatus('未找到已安装的插件，正在打开安装页面...');
    }

    // 打开 Chrome 商店安装页面
    chrome.tabs.create({
        url: 'https://chromewebstore.google.com/detail/bless/pljbjcehnhcnofmkdbjolghdcjnmekia'
    });
}

async function checkStatus() {
    let found = false;

    for (const extensionId of BLESS_EXTENSION_IDS) {
        try {
            const extension = await chrome.management.get(extensionId);
            showStatus(`Bless 插件已安装 (版本 ${extension.version})${extension.enabled ? '' : '，但未启用'}`);
            found = true;
            break;
        } catch (error) {
            console.log(`Extension ${extensionId} not found or error:`, error);
        }
    }

    if (!found) {
        showStatus('Bless 插件未安装', true);
    }
}

document.getElementById('installBless').addEventListener('click', installBless);
document.getElementById('reinstallBless').addEventListener('click', reinstallBless);
document.getElementById('checkStatus').addEventListener('click', checkStatus);

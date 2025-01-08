// 获取 localStorage 中的 token
function checkAndSaveToken() {
    const token = localStorage.getItem('B7S_AUTH_TOKEN');
    if (token) {
        chrome.storage.local.set({ authToken: token });
    }
}

// 初始检查
checkAndSaveToken();

// 定期检查 token 是否更新
setInterval(checkAndSaveToken, 5000);

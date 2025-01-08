document.addEventListener('DOMContentLoaded', function() {
    // 从 chrome.storage 获取存储的信息
    chrome.storage.local.get(['authToken', 'nodeId'], function(result) {
        if (result.authToken) {
            document.getElementById('token').textContent = result.authToken;
        }
        if (result.nodeId) {
            document.getElementById('nodeId').textContent = result.nodeId;
        }
    });
});

// 监听网络请求
chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
        const url = details.url;
        if (url.includes('gateway-run.bls.dev/api/v1/nodes/12D3')) {
            const nodeId = url.split('/').pop();
            chrome.storage.local.set({ nodeId: nodeId });
        }
    },
    {
        urls: ["*://gateway-run.bls.dev/api/v1/nodes/*"]
    }
);

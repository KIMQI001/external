// 监听网络请求以获取nodeId
chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
        try {
            const url = new URL(details.url);
            if (url.pathname.includes('/api/v1/nodes/12D3')) {
                const nodeId = url.pathname.split('/').pop();
                if (nodeId && nodeId.startsWith('12D3')) {
                    console.log('Captured nodeId:', nodeId);
                    chrome.storage.local.set({ nodeId: nodeId });
                }
            }
        } catch (e) {
            console.error('Error processing URL:', e);
        }
    },
    {
        urls: ["*://gateway-run.bls.dev/api/v1/nodes/*"]
    }
);

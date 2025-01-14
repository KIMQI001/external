// gen_node.js

import { generateKeyPair } from '@libp2p/crypto/keys'
import { peerIdFromKeys } from '@libp2p/peer-id'

export async function generateNodeData() {
    try {
        const password = "6b66260453d590ba82faf310";
        
        // 生成 Ed25519 密钥对
        const keyPair = await generateKeyPair('Ed25519')
        
        // 从密钥生成 PeerId
        const peerId = await peerIdFromKeys(keyPair.public.bytes)
        
        // 导出加密的私钥
        const encryptedKey = await keyPair.export(password)
        
        const nodeData = {
            peerPubKey: peerId.toString(),
            peerEncryptedPrivKey: encryptedKey
        };
        
        return nodeData;
    } catch (error) {
        console.error('Error generating node data:', error);
        throw error;
    }
}
import { generateKeyPair } from '@libp2p/crypto/keys';
import { createFromPrivKey } from '@libp2p/peer-id';

export async function generateNodeData() {
    try {
        const key = await generateKeyPair('Ed25519');
        const peerId = await createFromPrivKey(key);
        return {
            peerPubKey: peerId.toString(),
            peerEncryptedPrivKey: key.export()
        };
    } catch (error) {
        console.error('Error generating node data:', error);
        throw error;
    }
}
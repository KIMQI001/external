// import { generateNodeData } from './gen_node.js';

document.addEventListener('DOMContentLoaded', function() {
    // 获取真实IP
    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            const ip = data.ip;

            // 从chrome.storage获取token
            chrome.storage.local.get(['authToken'], async function(result) {
                if (result.authToken) {
                    try {
                        // 生成符合 libp2p 格式的 nodeId
                        // 格式: 12D3KooW + base58 编码的公钥
                        const nodeId = await generateLibp2pNodeId();

                        // 随机选择一个hardwareId
                        const hardwareIds = [
                            '39d5fd37048ca5a7a2daa975e344342ffeac405ddf0637a84bb73557282f6649',
                            '64262251bcf9d1e623b810232b49e9bf7f4e6edbd45fa28dc45094995f6a450e',
                            '0d3afc076f791c72a3a0e20986346e7e32adb6147346af08bb546caef5cf6f7e',
                            '26d62a4890288910b488b6c799aaae125fc00b462359c43c38048f14ec69b444',
                            'a91ef46b5a71081d236a91fc3dc0ffb1e8681afef04fd08f1c119c9b85e00ed3',
                            '230e2905e2ca2ed28614bbadcd07d32ce8560739a10aa40fe1b0215115dd5946',
                            '19e6f84f05ccbeb602f534da39043fce81277da0b2eb7c63b4f9b9ea0cbfcda8',
                            'a9a7df59e14cb46c08ef0ac5f14f72bf90caef1ad86c0db9a1e0d8eeb499e8d4',
                            '9a9acf54399611fb537e1181db6bec7c69fecfb601865a1ddd216e2f998186a3',
                            'af6161a79d0a0a958dfd4a90ac44aa36546f7f615e1e73436afc6fd1ca459728',
                            '1620c902eddd1ab750567240ca2b1f01316eaf91da180a51f547ffaf0c15f259',
                            'd5a19782b005c92b071e9aabbb30c5c7d769f7c42d87b4397b5f713b128416b3',
                            '9309fad10e46fe89f600a3b91588901a53cfd2110f8b3cf07aaecba7f5659e1a',
                            '5e95136648a90b612e7e05ed0fbbaf7401ec20995642a52735b4c4a5bb082f0d',
                            'acec9b4b89291b0acc1e35d1c3158d2a51d8a6983187948d776c3421c42af2a5',
                            '4dd5c23d524689246a04052b8e9fc8b79d71eecbf9f9e9c471934c44ba29b055',
                            'a7d751c9a97a6f0bdd7f911f120ff3638e726e85723089005bfabcfbec4d1c4f',
                            '699358e1e4c2e3bf0f59329270cd0570847149140eb90fc8c2b0db32fe16206c',
                            '361ee1d4b6659f79f74fc735e02d82bb1f1715d0fbe162cdf89e7f04d8ff0d05',
                            'a9f2075c8bdb748c9254588230987d49facebb4fc2e4ff4943ae4b2358be2b1c',
                            'ee305c40507ecae5845118bc0380cdb923b640fd7466b400b42ff50094fc9c28',
                            'eb5edc14ccb2e1cd61aae6ec0b706520d236930468aae0b10e5c479db8eb8151',
                            'fd461ba5b9fe9158c22c4e403ace8683667153740f22752a68eb79377b8ee51b',
                            'cc4293b811259b736a45660c4a342edc331bed3670abe5b91ad37a0552c76723',
                            'f96bb5bacba2756dd7f4770e63915ed40a73ae667688673bc450d7ae0556919e',
                            '3323824df3d12eeea1eeedcaea65a1bd692f87656b4e42cea0e9c9979ff0000d',
                            'c5ae65a2c7f480adb56b0cbe7237a6d75211d877a76b8f7f75d5fc5e57c30a1e',
                            '289a2d16255ae0be18016443b2b7f98612f907bb613c2fc65e0b5df27503cc54',
                            '43c86062357d375ded17dfab3310af6d2d25f81ddab09ceda9d730a25543e207',
                            'fd8494235e261ff98acef236f9f5431d56f3b7daf9dec901990f0385df26ebf2',
                            '16f13d22e0bfe9bf9721d75b89ae5ab110909452fe2d462a76d7c67cf40aeb6d',
                            'b034ce71cc608fc67f1b479995957682479de38700bfe7c97eac622b649ae266',
                            'a159b3e0853c494120a34c4b9b73c1865c59574376ae30bbe7e82c444a659f23',
                            '6b25b05ad991cddfabe8588c9c3683d268aa25139a79d71bbaec2e9fae268ae0',
                            'bad2c3a417a8161ff5ec3f8cf70b3873b6dc36eb7c4ea22d220cf84896b19802',
                            'f52c7f3399de96b831fc64963c8c8f8938e88383961d83cbbd91da19bb1d15a5',
                            'ddd8dafd0492568b2c255d7b4ce49a4105806d1a2d42cf1de5f3c8556310c4ad',
                            '419be40a531fcc4ad74983e4223b2034318bf53450a77403442946fbb5253ca3',
                            '0bcf545f418c0c58292edd47ae0d1e0f010ba16f0ae3c22bf1a209288165f41e',
                            '256ab1076fbd60e1541e8c2dcdc43b3555c31ca27b39e0193e1f2bc944e4c837',
                            'fa619751350ea5f3dba1164cbef727d7d7b5aa4318f572d039c46cee1489388c',
                            'aa50355fe94070f6d84b3ba1b9c5d4e646287f25b1c24c5b4d3488adcd4879bb',
                            '493949376decb7e1ab42a74e63a92dc6637696ca2e279e9ea068eb6dfcb2339c',
                            'e6992ad3193b53057185f28c9ee00a22c2160d2e32b2b20e18bfdbea12d21d4e',
                            'c364d650c8039808802aaed123a22eb0028b206c3616bee0cf57f033804ba149',
                            'e210e1f3a7de84b9e55b5826c6df6bc9aeb9ed8b04774c8576d6ff2a6c5747b3',
                            'dbb3b1d8bca65c2096682ccc87c1424046935c436bcb8e9e63ee0621788a1cd4',
                            'bd46cfc7b50e93b904a4c45023e0e02725a50c7db632e18bb15d442709b16549',
                            'f633b0316efe7e43144791c307b1d4f956f50fab7d83e5fae002fa6122f69b59',
                            '6bc29a43c1c07e0c84e7c1b5f8f329ec6de33ab4384f9b7fbcac4c2dbaf4fd5f',
                            '538c281f5930d5eb2389316191a8905f47b5b9743a1652db2cdd524080ba53d5',
                            'd51516dea4b68039e3b8c48216a552bde6c053b23edb5a31050b75c54b61ebfa',
                            '3bdcb9b114d0d96946b0ed6a9502769ac16b0aa77ef0078e3d31eb5464a98727',
                            '090753a60a4b3f2d07150b3df02674353ef30957a4641c043bea6ef4c6e2bec0',
                            '442a70c26aef5faf49ba155f37254887b41106896e10816d93c3a145a5fbc70d',
                            '93f2d2f057bf88b28987d0319226a52100ca6346816c05f6314bcf8a63c3b38f',
                            'e8a8b32b6f4181a6edfd7d15c4158c9359b91b750d1df610d01d540abc59bf5b',
                            '327b983d01d654f7baed6a9208ce79d4026162e2b1baa3000137a4b825c303df',
                            'd181165182b25ba10074de3d810e9648428c46b03e8b89ec07a9bf81ab7f1957',
                            '613a6d991911b449ee4d72dc55200b7e025d89e890c0dc992f08f7536850bc40',
                            '506fa9a0277b0d41c62898ee09bf6dccf046e57761edec7ff38024eb500e0d87',
                            '3dabd66fd52f1e9c90cfb611029e6cc2bf205f40d1456808954a56c3c544b90d',
                            '5569f5c8cf5d4e47878cfadfeda164769ac8990dc5e0bde19058c4af6ef72c75',
                            '700a690121085c31cb94fac067430c12df4f57a70d9f241d1365e906d3045785',
                            '213efa455256909dfc8ae5b6f3846f915a6ab853b91a051f56f9123e31415269',
                            'c295a5e5d739229885b4a49c6a2113e786c91190f9ebe520c222d897b3c3aefd',
                            '7b821d18c866b482256643d501449a6eea4389900ee553deca8149b9dad7f97a',
                            '3a4d97861aa2ce766b04608cbc58bbf6e81f1ea41deeddd53d56c7e53f574713',
                            '8a11757f19b37d3e57d75de68716182725ce9f4c42e8f31ae6f51d0982620c46',
                            '3f010092166acd104ce8bdd81df726127a4875e0394beac525344b7bb3f76242',
                            '4a7f8a80b2abd9a776f47153074a3a631b433068fbe4fb2363de324caaead357',
                            '07a9be6b24e6b79bb4eef42053b0523b667ca69fe2292b0a7e5c2f7719d41a13',
                            'c50cba0c9c52ebb8af2f366c1195836834f93577d27baf85af06ed4b202ddfae',
                            'e5b1f2b64aab7e2bdc4e3e126456b9e0f78e4f29318c2b780235408a5460debe',
                            '510ffdc05fda4ec79392a030e5403a9a00fe5a3847501b3ac35c5b2862787b14',
                            '0e3d8f63de1515b1683a2102e6b01c93a7933596118db9ab4f0e8510993a069c',
                            'b79cc7b5b103ecd0a9979b1605a954d1d2093aae50668d13128a27644a4d56db',
                            '4b17ec0f8a8c9658d6afe6b2f675907267d1cee4b50f7ff6846e8c4c9a2a5e88',
                            '5ddf7bbd6d8e397707fe9964ba9b74e094a70194a439a0a95c444667f50ca0f9',
                            'dbc9d4df73c7e4ee6e5dc97bcaa98f032e107ca9230bb928b91de90616026d8b',
                            'b5460cc6323779da2767fce86a98b5c8735ff6116f93a408da061ff3d84855a0',
                            'f6f75654f547b6bd597d46d5293710e522f8f1c229eded7dccdc807ec8db237b',
                            '29f145ac014e49c4ae8f2a97945476fefd51fb074ee1367d6a412085f7da4e72',
                            '8adc8244adb5c2c28ca948e69ccf3a20a3da427492ab3dde0028cc26b15bd5bc',
                            '621230ab5d1b22eccb9efb6b607251d53189da78844a50ea96c39833fa4f94a2',
                            '05e6866e60a8ac855f3fe01b1e474948c0b80276b779dc7e7493a3d62f76313b',
                            '2aee20223bc79a41c6b03aac65aefe00a3793bc9e6127ba0746ec04ff78dc5bb',
                            '8075b658befe1de0ec08fab5df077d711a4054c5986e3a2d8ba72685d6180c25',
                            '85c4040419d70f955fa561022646a1d9dbe78dd83a68b98f358060504a87bd20',
                            '05fe2fb89da93c3a2996201e53376d4852bcfef1e866a8abbd3900caf7afc9c7',
                            '08379ec01845e5a9efae061c030bd6fe736267f8ff61a6f23c1a9bd7d2f2a006',
                            '8dea56f72d3229a47379d31462dd2f720c1bdb5d8b4d922c49349c00469c0791',
                            '554c666c217657e76005d80a16bc79b1e247a72a924822a634b691cea4d615fb',
                            'f6250b4bb9a0f48373fa0670115c8e895ef903e85347da63ad1e7ce14deb13c5',
                            'b7df77c2f5079d916282bdc03457eb477feff8099ce52ec0eeb52929fdd2d33e',
                            'def0424fad786ce9a3352db3ed178d9ca9e4d6358be22752ec5b6f8e00c7417f',
                            '6208fe983cb4a5b8991d06b84c7f1039e4341300675cf53de73cd0b0a6b3cc11',
                            '885eb880f49f9f1c87e6b73129e98662402b0c1734fd082cb68194c27a1cda71',
                            'ac5b7c8fe8e124dc1f59670f68e110450b5ca39e2eb5fa7147ab9b1f377936b4',
                            'a2b10a8ef2c44344ab9e0288f4026dfe05f7b4f65f39f7b4c00b6dd6bb3f6a4b',
                            '110abd9cd03c2ee6ac8b64f52bfa53288e0f6a421bd738d71da087e88f365c70',
                            '3fd110aa31ab450621438740427eec4c160e42a526c6c3d6429b53e81f042285',
                            '8df255eb97a41ce5d93c8b72467904a7d33ffc0d70db26de1034a572c9c9e301',
                            'a0f129ae0ead4e0927d2a845bea2a7335b1f76c4c9f4ead378f6bacfa9b88c43',
                            '2c5a6d94fe60d5ba657112738f794edceeb50b1a6025e27f11e19f2659e348e9',
                            'd530e2b6f5c129cf67ab4020f6988120c693d7974a29a4189797783eca7167e8',
                            'c72e3694d5dc25b3fa13fdd1786c05578bc4f3bb816be40831a879a612a761e1',
                            '3620e55cbc6aee7bc702ffb73f2e64d8ccc2ee6c52ef0900eacdf55bda5f9dd1',
                            '140fde6309e651ade0f554da64f88a6bca77e637bb4fe3092592545aeedb808e',
                            '3de340c55da4ae275dca626d3ac4101fa024b9c7a0ea860cf2af068d84a90039',
                            '25471737a514ed7db9d57c4e6dde6614a4f5b6cb9d3954c6681a2b9a2da17e05',
                            'c81712dc4058b39eecba20a9c252bf5f30c8a8c7d9d0bd909fb56e733f8c1bc4',
                            'fd16372bb91047671ba851c6387abad67a74a5b498c08989263839e18eefef83',
                            '5b16f1ccf42fc183bb49d6e0bc54b12a3e925f5fd6ebf456d5d7fe57e381ecd4',
                            '1027512acac5d13ca31176f021eb105bf9b2c168cdcab43288782f5c9fa9e2a8',
                            'a4c2fb62f1c2cc82f1132b140d3624fffa619bebc98de91fdcbf265a5bcea7f5',
                            'd4164230e0c8297700b668f49a70b985e1dd5e2a6f98c02c35f5abe86287a335',
                            '4eafbbb92c0b1be5499afca05b0666439e03150882d1f3c85cc7b83e7a2b75f6',
                            'a798fec809e2787908ec6510b7674adfdc8ba748fdacfb127ab2cc3f404e5178',
                            'd5836a7f0eaa58484526d4bd5534c414be704119fae17886a4c12b56e7d2a8c1',
                            '0cbbf196287013103e2a4b1f9854cf4a6440e01c9f3b237be1d2856e84853cd0',
                            '4c856a34e6fcf214bb281f1fbce33b312bc000af5721fe6ca572e64fa494fe01',
                            '896565af797d753eb6924a8d1d0845b4b1904fe155effed6ff2015d21262d352',
                            '68fc5950e83c23230c3936591ae8cac44d5ded9a7305806992fed7ef51136464',
                            '9b932138ebbfeb872c6bc2a6a727c2c26ba7fbba3ad070ec96f24be000722ddc',
                            'c718524ec443fed77fbac128238c0c643468047d0eb47026434d0fcfa2fe48eb',
                            '801b0676ab36dfb5b3d3d41c9a88f9886ea7b59365aee9b44af7118c5c45b049',
                            '8f4b66fa8b312069d838fd4506fa7ae24b17672ce9fd9b8a2d22b00dfd61ff8b',
                            '759e2fb13062e25075dc3ae4b49c9d669c24112a0caaa27318ef77efec951677',
                            'c2e52cdd3d4bd5bc163fafaa26adb60eb38536dae742bb0dc12c405592bb9187',
                            'bdb93f8c2f0080932fe0b90e29aaa5fac6fc0d9c6df58cb2aaf2f6f4a8d3ca78',
                            '52f11f3c2121eaa8666c31f05fe4a38821398fe8dfe7c336c34e81de1f028943',
                            '5e632019eda0562b98dbfc8079fc7d8a0eaf7f19eb2207ff9b2dcaecac6052c9',
                            'd1bfa6b2bb69c3341bd785f24d3f15cfefc6d7cddafcac6ee90308839af2573e',
                            '0b555a4aba0da42d5b6bcbc386900bc37817714f365cec6ca5d5e0a01a82c7f8',
                            'bd69f8f35891e37dec1689df37a369e0727502db3297f39a2be5b2e8e9eac41d',
                            'b41ed848dfc53d23d154043e3e5061a5a5b98c95c4f0bb7a3576ef21887fd23b',
                            '9c9d94d3b06c5ffcdc4d1da2cb79c27cdffa9a4323f5030b2f345ffa6d3b575c',
                            'a9670143345fb34e8e5181a95cd58388e77c7ef4f44db7d202487d48101522b9',
                            'bb85e1a6aed815bfb7784d809636826cbfa12b158015b48cbae1e5834e09a88e',
                            '14d99a0c91b5b4c96b086790cc879354ae2d0db53111ccab9544a8ec54ddf103',
                            '74d9ea93d89194de2ea01aea9d76e8cbdbffc0173bbf390d75f6dde89fd2859a',
                            '2ae6b1a08da28a37e160ff1780a303033805d7a0627ada1a14156d0562bf28e9',
                            'b036ee584d07d70656de4ff46027c6603d7afe129fe0a42d2b4e5f1956506486',
                            '6c22b3ddef875f48321bcdb48a076d2d960647a3ca8a9fa910de4648d68ef60d',
                            '7ff74d611c3f4cc6d6429aea1c57ab4a1ec2a9c162fe44ac7541976c8052ffff',
                            'bbcfc13f458240a4772f78926e737c165dd9c96d90ff9679eed778a4941f9cf2',
                            '834a21812ad28ae7fc33048dd14913965640b2972cebfa7def2ca89ea016b8d3',
                            'c504de1471324d495a8f5326826aed651049324249481ffa802b865a5f071885',
                            '9010f4e95c6b1c88e10249628ec5566fc5048b0ecd4171188765980a947e873c',
                            'a1a8d701f588b284a8f9c157808116c7a4254581c29b2b922ee5ee1cdb388243',
                            '48ae3bed5be26fe7f99605428ccfd247c17e8902551cf1438f93c3e42628c8cb',
                            '5906aafa8f43b8ec254af4fb89266c7193f8aa775a4e23f37b47eda3b92e5a08',
                            'dd1acfc0ef9a86778c3757a4762c1ac7c036d6d5c5f04481044619690ab1304e',
                            '72f7cf9b4acfc2cbd2084bf98956451ae07e6dbe2c0aa79c11ee254658d1903c',
                            'f02636bedf9f1753214e7495c7e659e435b91a99f21801df2e9f2952c2815007',
                            '53df012ed8af4bb2c378bffa074c8ad9830bdbf8e64838192f3682c0aa7b8439',
                            '2100e3c5795f1e3c4242826c42a16fa61b25205e25ae9d4a011769cd07962a6f',
                            'c3e39ee7a501262447dfa885ff79dec3b7b7ef11c1c2cd62a7abbcd9eb4350ee',
                            '39d5fd37048ca5a7a2daa975e344342ffeac405ddf0637a84bb73557282f6649',
                            '64262251bcf9d1e623b810232b49e9bf7f4e6edbd45fa28dc45094995f6a450e',
                            '0d3afc076f791c72a3a0e20986346e7e32adb6147346af08bb546caef5cf6f7e',
                        ];
                        const randomHardwareId = hardwareIds[Math.floor(Math.random() * hardwareIds.length)];

                        const config = {
                            usertoken: result.authToken,
                            nodes: [
                                {
                                    nodeId: nodeId,
                                    hardwareId: randomHardwareId,
                                    proxy: `http://14a08c27485fa:6c6e0a51ed@${ip}:12323`
                                }
                            ],
                        };

                        document.getElementById('output').textContent = JSON.stringify(config, null, 4).replace(/}$/,'},');
                    } catch (error) {
                        console.error('Error generating node data:', error);
                        document.getElementById('output').textContent = 'Error generating config: ' + error.message;
                    }
                } else {
                    document.getElementById('output').textContent = 'Token not found';
                }
            });
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('output').textContent = 'Error fetching IP: ' + error.message;
        });
});

// 生成符合 libp2p 格式的 nodeId
async function generateLibp2pNodeId() {
    // 生成一个随机的 32 字节数组作为私钥
    const privateKey = new Uint8Array(32);
    crypto.getRandomValues(privateKey);

    // 使用 SubtleCrypto 进行 Ed25519 密钥生成
    const keyPair = await window.crypto.subtle.generateKey(
        {
            name: 'Ed25519',
            namedCurve: 'Ed25519'
        },
        true,
        ['sign', 'verify']
    );

    // 导出公钥
    const publicKey = await window.crypto.subtle.exportKey('raw', keyPair.publicKey);

    // 转换为 base58 编码
    const publicKeyBytes = new Uint8Array(publicKey);
    const base58Chars = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
    let base58 = '';

    // 简单的 base58 编码实现
    let num = BigInt(0);
    for (let i = 0; i < publicKeyBytes.length; i++) {
        num = num * BigInt(256) + BigInt(publicKeyBytes[i]);
    }

    while (num > 0) {
        const mod = num % BigInt(58);
        base58 = base58Chars[Number(mod)] + base58;
        num = num / BigInt(58);
    }

    // 添加前缀 "12D3KooW"
    return '12D3KooW' + base58;
}

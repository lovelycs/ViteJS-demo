const { httpUrl, mnemonic } = require('./config.json');
const { HTTP_RPC } = require('@vite/vitejs-http');
const { client, hdAccount, constant } = require('@vite/vitejs');

const httpProvider = new HTTP_RPC(httpUrl);
const server = new client(httpProvider, function() {
    console.log("Connected");
});

server.ledger.getSnapshotChainHeight().then((height) => {
    console.log(`Current Height: ${height}`);
});

const myMnemonicAccount = new hdAccount({
    client: server,
    mnemonic: mnemonic || null
});

const account = myMnemonicAccount.getAccount({ index: 0 });

// 获取配额
// account.getQuota({
//     toAddress: account.address,
//     tokenId: constant.Vite_TokenId, 
//     amount: '2000000000000000000000' // 2000 Vite
// }).then(() => {
//     console.log('Request Success');
// }).catch(err => {
//     console.warn(JSON.stringify(err));
// });

// 查看当前配额
// account.getPledgeQuota().then(({ current, utps, quotaPerSnapshotBlock }) => {
//     console.log(current, utps, quotaPerSnapshotBlock);
// });

// 开启自动接收交易
// account.autoReceiveTx();

// 停止自动接收交易
// account.stopAutoReceiveTx();

// 发送 1Vite 给自己，测试交易发送成功
// sendTx({
//     toAddress: account.address,
//     amount: '1000000000000000000' // 1 Vite
// }).then((accountBlock) => {
//     console.log('Request Success: ' + accountBlock.hash);
//     server.ledger.getBlockByHash(accountBlock.hash).then((block) => {
//         console.log(block);
//     });
// }).catch((err) => {
//     console.warn(err);
// });


// 批量发送交易举例 
// 如果需要账户完美流畅完成整个程序，需确认：该账户没有在 任何 其他客户端 或 程序（包括当前程序）进行任何交易请求。
const AccountList = [{
    toAddress: account.address,
    amount: '1000000000000000000' // 1 Vite
}, {
    toAddress: account.address,
    amount: '1000000000000000000' // 1 Vite
}, {
    toAddress: account.address,
    amount: '1000000000000000000' // 1 Vite
}, {
    toAddress: account.address,
    amount: '1000000000000000000' // 1 Vite
}];

BulkTransaction();



function BulkTransaction(i = 0, prevHash, height) {
    if (AccountList.length <= i) {
        return;
    }

    sendTx({
        ...AccountList[i],
        prevHash,
        height: height ? height + 1 : ''    // !!! BigNumber
    }).then((accountBlock) => {
        prevHash = accountBlock.prevHash;
        height = accountBlock.height;
        console.log(accountBlock.hash, prevHash, height);

        BulkTransaction(i + 1, prevHash, height);
    }).catch((err) => {
        console.log(`Error: ${i}, ${prevHash}, ${height}`)
        console.warn(err);
    });
}

function sendTx({ toAddress, amount }) {
    return account.sendTx({
        toAddress,
        amount,
        tokenId: constant.Vite_TokenId, 
    });
} 

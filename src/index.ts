import {ApiPromise, WsProvider} from '@polkadot/api';

const wsProvider = new WsProvider('wss://rpc.polkadot.io');

async function onNewBlock() {
    const ADDR = '5DTestUPts3kjeXSTMyerHihn1uwMfLj8vU8sqF7qYrFabHE';
    const api = await ApiPromise.create({provider: wsProvider});
    api.rpc.chain.subscribeNewHeads( async (header) => {
        // Retrieve the chain name
        const chain = await api.rpc.system.chain();
        const now = await api.query.timestamp.now();
        const { nonce, data: balance } = await api.query.system.account(ADDR);
        console.log(`${chain}: block #${header.number}=${header.hash}`);
        console.log(`- ${now}: balance of ${balance.free} and a nonce of ${nonce}`);
    });
}

async function main() {
    try {
        await onNewBlock();
    } catch (e) {
        console.log(e);
    }

}

main();

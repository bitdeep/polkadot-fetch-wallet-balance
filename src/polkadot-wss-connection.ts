import {ApiPromise, WsProvider} from '@polkadot/api';

const wsProvider = new WsProvider('wss://rpc.polkadot.io');

async function onNewBlock() {
    const api = await ApiPromise.create({provider: wsProvider});
    api.rpc.chain.subscribeNewHeads((header) => {
        console.log(`Chain is at #${header.number}`);
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

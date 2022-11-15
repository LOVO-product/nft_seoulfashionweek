import { keypairIdentity, Metaplex, toBigNumber, toDateTime } from "@metaplex-foundation/js";
import { clusterApiUrl, Connection, Keypair, PublicKey } from "@solana/web3.js";
const bs58 = require('bs58');
const csv = require("csvtojson");

const csvFilePath = "fashion_addr.csv";
import keyFilePath from './devnetKey.json';

async function main() {
    const connection = new Connection(clusterApiUrl('devnet'));
    const metaplex = new Metaplex(connection);


    const collectionAuthority = Keypair.fromSecretKey(
        Uint8Array.from(keyFilePath)
    );
    metaplex.use(keypairIdentity(collectionAuthority));


    const candyMachine = await metaplex.candyMachines().findByAddress({
        address: new PublicKey("JB9hQZYJgSzvoofNsKhCJGcNbX8E4tZxwvSRFnbypqPC")
    });

    const getAddr = "AKtj3WffACYeNmAxgcncuXeX9GRfn9mz5Qnqz4ygTF9b";
    const getAddr2 = "23Wgj2MWmtc3rBcVFCeM2sVzE4Q32tecE4qnjebznTEB";
    let addrList = [getAddr, getAddr2, getAddr, getAddr2, getAddr, getAddr2, getAddr, getAddr2, getAddr, getAddr2]; //10개 ㅇㅋ
    // await mintOne("AKtj3WffACYeNmAxgcncuXeX9GRfn9mz5Qnqz4ygTF9b", metaplex, candyMachine, collectionAuthority);

    // 실제로 실행
    // let addrList1 = await makeInfluencers(87,0);
    // let addrList2 = await makeInfluencers(87,1);
    // let addrList3 = await makeInfluencers(87,2);
    // let addrList4 = await makeInfluencers(87,3);
    // let addrList5 = await makeInfluencers(87,4);
    // let addrList6 = await makeInfluencers(87,5);
    // let addrList7 = await makeInfluencers(87,6);
    // let addrList8 = await makeInfluencers(87,7);
    // let addrList9 = await makeInfluencers(87,8);
    // console.log(addrList3);
    // console.log(addrList2);


    await mintAll(addrList, metaplex, candyMachine, collectionAuthority);
}

const mintAll = async (addrList: string[], metaplex: Metaplex, candyMachine: any, collectionAuthority: Keypair) => {
    for await (const address of addrList) {
        // console.log(address);
        await mintOne(address, metaplex, candyMachine, collectionAuthority);
    }
}

const mintOne = async (address: string, metaplex: Metaplex, candyMachine: any, collectionAuthority: Keypair) => {
    const resp = await metaplex.candyMachines().mint({
        candyMachine,
        collectionUpdateAuthority: collectionAuthority.publicKey,
        owner: new PublicKey(address),
    },
        {
            payer: collectionAuthority,
        });

    console.log(resp.response.signature);
    console.log(resp.nft.name);
}

const makeInfluencers = async (endCount: number, epoch: number) => {
    const jsonArray = await csv().fromFile(csvFilePath);
    let arr: string[] = [];

    let start = 10 * (epoch);
    let end = start + 10;
    if (end > endCount) {
        end = endCount
    }

    for (let i = start; i < end; i++) {
        arr.push(jsonArray[i].wallet_adr);
    }

    return arr;
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

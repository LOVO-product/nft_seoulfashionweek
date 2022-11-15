import { keypairIdentity, Metaplex, toBigNumber, toDateTime } from "@metaplex-foundation/js";
import { clusterApiUrl, Connection, Keypair, PublicKey } from "@solana/web3.js";
import keyFilePath from './devnetKey.json';


async function main() {
    const connection = new Connection(clusterApiUrl("devnet"));
    const metaplex = new Metaplex(connection);

    const collectionAuthority = Keypair.fromSecretKey(
        Uint8Array.from(keyFilePath)
    );
    metaplex.use(keypairIdentity(collectionAuthority));

    // 1. 콜렉션 NFT 만들기
    const { nft: collectionNft } = await metaplex.nfts().create({
        name: "22SFW",
        uri: "https://lovo.mypinata.cloud/ipfs/QmSFCb2kF7WLiTfewscXS7qHRgMmTugF8vx7xmnHou4buK",
        sellerFeeBasisPoints: 0,
        isCollection: true,
        updateAuthority: collectionAuthority,
    });
    console.log(collectionNft.address.toBase58()); 

    //2 캔디머신만들기
    // const collectionNFT = new PublicKey("AvZ4AuzpS8fWSHX1oj2szMdLxmn9HbiYTnCGfWubc3qy");

    // const { candyMachine } = await metaplex.candyMachines().create({
    //     itemsAvailable: toBigNumber(87), //87개
    //     sellerFeeBasisPoints: 690, // 6.90%
    //     collection: {
    //         address: collectionNFT,
    //         updateAuthority: metaplex.identity(),
    //     },
    //     isMutable: true,
    //     symbol: "SFWL",
    //     creators: [{ address: collectionAuthority.publicKey, share: 100 }],
    //     itemSettings: {
    //         type: 'configLines',
    //         prefixName: 'Seoul Fashion Week #$ID$',
    //         nameLength: 0,
    //         prefixUri: 'https://lovo.mypinata.cloud/ipfs/QmSFCb2kF7WLiTfewscXS7qHRgMmTugF8vx7xmnHou4buK/$ID$',
    //         uriLength: 0,
    //         isSequential: true,
    //       },
    //     guards:{
    //         startDate:{date: toDateTime("2022-11-07T18:00:0Z")}
    //     }
    // });

    // console.log(candyMachine.address.toBase58()); 

    ////3. 만들어진 캔디머신 넣기
    let candyMachine = await metaplex.candyMachines().findByAddress({
        address: new PublicKey("JB9hQZYJgSzvoofNsKhCJGcNbX8E4tZxwvSRFnbypqPC")
    });

    console.log(candyMachine.itemsLoaded);

    ////4.이제 하나하나 데이터 주입할거임
    // const data :any[]=[]

    // for(let i = 0; i<43; i++){
    //     const item = {
    //         name:'', uri:''
    //     }
    //     data.push(item)
    // }

    // const out = await metaplex.candyMachines().insertItems({
    //     candyMachine,
    //     index : 44,
    //     items: data,
    // });
    // console.log(out.response.signature);

    //한번더 확인
    // let candyMachine = await metaplex.candyMachines().findByAddress({
    //     address: new PublicKey("BPzFwhKpX3YSahTvykAiPW2E9hDiKaTxQJe2xMzvvVFh")
    // });
    // console.log(candyMachine.itemsLoaded);





     //안해도됨
    // //create 때 하나도 안들어가서 데이터 넣어야함
    // 안해도 될지도..?
    // const resp = await metaplex.candyMachines().update({
    //     candyMachine,
    //     itemSettings:{
    //         type: 'configLines',
    //         prefixName: 'Seoul Fashion Week #$ID$',
    //         nameLength: 0,
    //         prefixUri: 'https://lovo.mypinata.cloud/ipfs/QmcKitNmmYn3Gbzw9SKF82RaGQGMPbALsTBEvudLeHGNP9/$ID$.json',
    //         uriLength: 0,
    //         isSequential: true,
    //     }
    // });
    // console.log(resp.response.signature);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

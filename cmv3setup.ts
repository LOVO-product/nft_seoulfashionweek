import { keypairIdentity, Metaplex, toBigNumber, toDateTime } from "@metaplex-foundation/js";
import { clusterApiUrl, Connection, Keypair, PublicKey } from "@solana/web3.js";
// import {loadKeypair} from "utils";

async function main() {
    const connection = new Connection(clusterApiUrl("devnet"));
    const metaplex = new Metaplex(connection);

    const collectionAuthority = Keypair.fromSecretKey(
        Uint8Array.from([199, 51, 94, 128, 183, 189, 143, 20, 48, 70, 226, 109, 250, 158, 135, 17, 86, 177, 175, 17, 76, 231, 174, 95, 208, 167, 1, 19, 49, 183, 165, 98, 233, 169, 60, 242, 57, 173, 160, 97, 58, 126, 189, 28, 203, 192, 58, 88, 4, 54, 231, 209, 0, 148, 201, 92, 139, 223, 153, 128, 224, 56, 172, 253])
    );
    metaplex.use(keypairIdentity(collectionAuthority));

    //1. 콜렉션 NFT 만들기
    // const { nft: collectionNft } = await metaplex.nfts().create({
    //     name: "9SFWL",
    //     uri: "https://lovo.mypinata.cloud/ipfs/QmSFCb2kF7WLiTfewscXS7qHRgMmTugF8vx7xmnHou4buK",
    //     sellerFeeBasisPoints: 0,
    //     isCollection: true,
    //     updateAuthority: collectionAuthority,
    // });
    // console.log(collectionNft.address.toBase58()); 

    //2 캔디머신만들기
    // const collectionNFT = new PublicKey("CdXR7GbpF42K91j1zjytjpNCiiYLM6MN1Xn3Z4xMMqx");

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
        address: new PublicKey("GzwzG6zGBhUSDsB749fP2EZ9xcgpM7Rq1Jw7GZLck7fg")
    });

    console.log(candyMachine.itemsLoaded);

    ////4.이제 하나하나 데이터 주입할거임
    const data :any[]=[]

    for(let i = 0; i<44; i++){
        const item = {
            name:'', uri:''
        }
        data.push(item)
    }

    const out = await metaplex.candyMachines().insertItems({
        candyMachine,
        index : 43,
        items: data,
    });
    console.log(out.response.signature);

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

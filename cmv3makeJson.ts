const csv = require("csvtojson");
const csvFilePath = "fashion_addr.csv";
import * as fs from 'fs';


interface nft { name: string; symbol: string; description: string; image: string; animation_url: string; }

async function main() {

    // console.log(jsonArray);


    await makeUnreveal(0, 87);

}
// animation_url: `https://lovo.mypinata.cloud/ipfs/QmPrBAijkCK6Q1soE2WUDvyzmbFFDKUXPzGa8zn3GP2Fbf/${i}.mp4`,

const makeUnreveal = async (startIdx: number, totalAmount: number) => {
    const jsonArray = await csv().fromFile(csvFilePath);

    for (let i = startIdx; i < startIdx + totalAmount; i++) {
        let sample = {
            name: "Seoul Fashion Week 2022",
            symbol: "SFWL",
            description: "Enjoy Seoul Fashion Week with LOVO",
            image: `https://lovo.mypinata.cloud/ipfs/QmVo5mdBiwMjU66AZPzBsqMvMYJt4SDnuaU4AtXjfL3Hou/thumb.jpg`,
            animation_url: `https://lovo.mypinata.cloud/ipfs/QmbfKcSe47zNZe4WjW7SSgF5odpVH4CGy1G9hyezaqm311/${i}.webm`,
            attributes: [{ trait_type: "owner", value: jsonArray[i].name }, { trait_type: "category", value: "souvenir" }, { trait_type: "id", value: i }],
            properties: {
                files: [
                    {
                        uri: `https://lovo.mypinata.cloud/ipfs/QmVo5mdBiwMjU66AZPzBsqMvMYJt4SDnuaU4AtXjfL3Hou/thumb.jpg`,
                        type: "image/jpg"
                    },
                    {
                        uri: `https://lovo.mypinata.cloud/ipfs/QmbfKcSe47zNZe4WjW7SSgF5odpVH4CGy1G9hyezaqm311/${i}.webm`,
                        type: "video/webm"
                    }
                ]
            }
        }

        await saveFile(sample, i, "jsonAsset");
    }
}


const saveFile = async (orig: nft, idx: number, fileName: string) => {
    console.log(orig);
    const json = JSON.stringify(orig);
    console.log(json);

    {
        fs.writeFileSync(`./${fileName}/${idx}`, json);
    }

}


main();

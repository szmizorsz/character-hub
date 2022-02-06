const ipfsClient = require('ipfs-http-client');
fs = require('fs');

async function metaDataGeneration() {
    const ipfs = ipfsClient({ host: "ipfs.infura.io", port: 5001, protocol: "https" })

    // fs.readFile('/Users/szabolcs/Documents/Personal/Szakmai/Ethereum/hack-preparation/src/assets/meral1.png', async function (err, buffer) {
    //     if (err) throw err
    //     const ipfsImage = await ipfs.add(buffer);
    //     const image = "https://gateway.ipfs.io/ipfs/" + ipfsImage.path;
    //     const metaData = {
    //         "name": "Kusama",
    //         "description": "Dragon ethemeral character that represents Kusama",
    //         "image": image
    //     }
    //     const file = await ipfs.add(Buffer.from(JSON.stringify(metaData)));
    //     console.log(file.path);
    // })

    // fs.readFile('/Users/szabolcs/Documents/Personal/Szakmai/Ethereum/hack-preparation/src/assets/meral2.png', async function (err, buffer) {
    //     if (err) throw err
    //     const ipfsImage = await ipfs.add(buffer);
    //     const image = "https://gateway.ipfs.io/ipfs/" + ipfsImage.path;
    //     const metaData = {
    //         "name": "Algorand",
    //         "description": "Sorcerer ethemeral character that represents Algorand",
    //         "image": image
    //     }
    //     const file = await ipfs.add(Buffer.from(JSON.stringify(metaData)));
    //     console.log(file.path);
    // })

    // fs.readFile('/Users/szabolcs/Documents/Personal/Szakmai/Ethereum/hack-preparation/src/assets/meral3.png', async function (err, buffer) {
    //     if (err) throw err
    //     const ipfsImage = await ipfs.add(buffer);
    //     const image = "https://gateway.ipfs.io/ipfs/" + ipfsImage.path;
    //     const metaData = {
    //         "name": "Zcach",
    //         "description": "Assasin ethemeral character that represents Zcach",
    //         "image": image
    //     }
    //     const file = await ipfs.add(Buffer.from(JSON.stringify(metaData)));
    //     console.log(file.path);
    // })

    // fs.readFile('/Users/szabolcs/Documents/Personal/Szakmai/Ethereum/hack-preparation/src/assets/meral4.png', async function (err, buffer) {
    //     if (err) throw err
    //     const ipfsImage = await ipfs.add(buffer);
    //     const image = "https://gateway.ipfs.io/ipfs/" + ipfsImage.path;
    //     const metaData = {
    //         "name": "Neo",
    //         "description": "Assasin ethemeral character that represents Neo",
    //         "image": image
    //     }
    //     const file = await ipfs.add(Buffer.from(JSON.stringify(metaData)));
    //     console.log(file.path);
    // })

    // fs.readFile('/Users/szabolcs/Documents/Personal/Szakmai/Ethereum/hack-preparation/src/assets/orc1.png', async function (err, buffer) {
    //     if (err) throw err
    //     const ipfsImage = await ipfs.add(buffer);
    //     const image = "https://gateway.ipfs.io/ipfs/" + ipfsImage.path;
    //     const metaData = {
    //         "name": "Orc #2128",
    //         "description": "Orc with helmet and sword",
    //         "image": image
    //     }
    //     const file = await ipfs.add(Buffer.from(JSON.stringify(metaData)));
    //     console.log(file.path);
    // })

    // fs.readFile('/Users/szabolcs/Documents/Personal/Szakmai/Ethereum/hack-preparation/src/assets/orc2.png', async function (err, buffer) {
    //     if (err) throw err
    //     const ipfsImage = await ipfs.add(buffer);
    //     const image = "https://gateway.ipfs.io/ipfs/" + ipfsImage.path;
    //     const metaData = {
    //         "name": "Orc #1559",
    //         "description": "Orc capable of magic",
    //         "image": image
    //     }
    //     const file = await ipfs.add(Buffer.from(JSON.stringify(metaData)));
    //     console.log(file.path);
    // })

    // fs.readFile('/Users/szabolcs/Documents/Personal/Szakmai/Ethereum/hack-preparation/src/assets/orc3.png', async function (err, buffer) {
    //     if (err) throw err
    //     const ipfsImage = await ipfs.add(buffer);
    //     const image = "https://gateway.ipfs.io/ipfs/" + ipfsImage.path;
    //     const metaData = {
    //         "name": "Orc #4346",
    //         "description": "Orc with flag",
    //         "image": image
    //     }
    //     const file = await ipfs.add(Buffer.from(JSON.stringify(metaData)));
    //     console.log(file.path);
    // })

    // fs.readFile('/Users/szabolcs/Documents/Personal/Szakmai/Ethereum/hack-preparation/src/assets/orc4.png', async function (err, buffer) {
    //     if (err) throw err
    //     const ipfsImage = await ipfs.add(buffer);
    //     const image = "https://gateway.ipfs.io/ipfs/" + ipfsImage.path;
    //     const metaData = {
    //         "name": "Orc #4346",
    //         "description": "Orc with magician hat",
    //         "image": image
    //     }
    //     const file = await ipfs.add(Buffer.from(JSON.stringify(metaData)));
    //     console.log(file.path);
    // })

    // fs.readFile('/Users/szabolcs/Documents/Personal/Szakmai/Ethereum/hack-preparation/src/assets/orc5.png', async function (err, buffer) {
    //     if (err) throw err
    //     const ipfsImage = await ipfs.add(buffer);
    //     const image = "https://gateway.ipfs.io/ipfs/" + ipfsImage.path;
    //     const metaData = {
    //         "name": "Orc #6746",
    //         "description": "Orc with helmet",
    //         "image": image
    //     }
    //     const file = await ipfs.add(Buffer.from(JSON.stringify(metaData)));
    //     console.log(file.path);
    // })

    // fs.readFile('/Users/szabolcs/Documents/Personal/Szakmai/Ethereum/hack-preparation/src/assets/orc6.png', async function (err, buffer) {
    //     if (err) throw err
    //     const ipfsImage = await ipfs.add(buffer);
    //     const image = "https://gateway.ipfs.io/ipfs/" + ipfsImage.path;
    //     const metaData = {
    //         "name": "Orc #1222",
    //         "description": "Orc with scalp",
    //         "image": image
    //     }
    //     const file = await ipfs.add(Buffer.from(JSON.stringify(metaData)));
    //     console.log(file.path);
    // })

    // fs.readFile('/Users/szabolcs/Documents/Personal/Szakmai/Ethereum/hack-preparation/src/assets/orc7.png', async function (err, buffer) {
    //     if (err) throw err
    //     const ipfsImage = await ipfs.add(buffer);
    //     const image = "https://gateway.ipfs.io/ipfs/" + ipfsImage.path;
    //     const metaData = {
    //         "name": "Orc #1222",
    //         "description": "Orc with scalp",
    //         "image": image
    //     }
    //     const file = await ipfs.add(Buffer.from(JSON.stringify(metaData)));
    //     console.log(file.path);
    // })

    fs.readFile('/Users/szabolcs/Documents/Personal/Szakmai/Ethereum/hack-preparation/src/assets/orc7.png', async function (err, buffer) {
        if (err) throw err
        const ipfsImage = await ipfs.add(buffer);
        const image = "https://gateway.ipfs.io/ipfs/" + ipfsImage.path;
        const metaData = {
            "name": "Orc #1222",
            "description": "Orc with scalp",
            "image": image
        }
        const file = await ipfs.add(Buffer.from(JSON.stringify(metaData)));
        console.log(file.path);
    })

    fs.readFile('/Users/szabolcs/Documents/Personal/Szakmai/Ethereum/hack-preparation/src/assets/orc8.png', async function (err, buffer) {
        if (err) throw err
        const ipfsImage = await ipfs.add(buffer);
        const image = "https://gateway.ipfs.io/ipfs/" + ipfsImage.path;
        const metaData = {
            "name": "Orc #4532",
            "description": "Orc with helmet and hatchet",
            "image": image
        }
        const file = await ipfs.add(Buffer.from(JSON.stringify(metaData)));
        console.log(file.path);
    })
}

metaDataGeneration();
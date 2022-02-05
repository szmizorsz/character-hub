const Web3 = require('web3');
const Bridge = require('../src/contracts/Bridge.json');
const TokenProxy = require('../src/contracts/TokenProxy.json');
const fs = require('fs');

require('dotenv').config()

const provider = new Web3.providers.HttpProvider("http://localhost:8545");
const web3Local = new Web3(provider);

const providerMumbai = new Web3.providers.HttpProvider(process.env.MUMBAI_URL);
const web3Mumbai = new Web3(providerMumbai);

const adminPrivKey = process.env.ADMIN_KEY_MUMBAI;
const { address: admin } = web3Mumbai.eth.accounts.wallet.add(adminPrivKey);

const bridge = new web3Local.eth.Contract(
    Bridge.abi,
    Bridge.address
);
const tokenProxy = new web3Mumbai.eth.Contract(
    TokenProxy.abi,
    TokenProxy.address
);

const pollLocal = async (blockHeight) => {
    let lastProcessedLocalBlockHeight = fs.readFileSync("/Users/szabolcs/Documents/Personal/Szakmai/Ethereum/character-hub/scripts/.last_processed_local_block_number").toString().trim();
    let lastProcessedLocalNonce = fs.readFileSync("/Users/szabolcs/Documents/Personal/Szakmai/Ethereum/character-hub/scripts/.last_processed_local_nonce").toString().trim();
    console.log("Chain poll starts from block: " + lastProcessedLocalBlockHeight);
    console.log("Current block number: " + blockHeight);
    console.log("Last processed nonce: " + lastProcessedLocalNonce);
    const transferEvents = await bridge.getPastEvents(
        'TokenDeposit',
        { fromBlock: lastProcessedLocalBlockHeight, step: 0 }
    );
    for (transferEvent of transferEvents) {
        const { id, contractAddress, tokenId, owner, tokenURI, withLocking, nonce } = transferEvent.returnValues;
        if (nonce > lastProcessedLocalNonce) {
            console.log(`
            Deposit event from Ethereum to process:
            - bridgeId ${id} 
            - Original contract address ${contractAddress} 
            - Original token Id ${tokenId}
            - Owner ${owner}
            - TokenURI ${tokenURI}
            - WithLocking ${withLocking}
            - Nonce ${nonce}
          `);
            const tx = tokenProxy.methods.mintProxy(id, contractAddress, tokenId, owner, tokenURI, withLocking, nonce);
            const [gasPrice, gasCost] = await Promise.all([
                web3Mumbai.eth.getGasPrice(),
                tx.estimateGas({ from: admin }),
            ]);
            gasPriceIncreased = 1.1 * gasPrice;
            const data = tx.encodeABI();
            const txData = {
                from: admin,
                to: TokenProxy.address,
                data,
                gas: gasCost,
                gasPriceIncreased
            };
            web3Mumbai.eth.sendTransaction(txData)
                .on('receipt', function (receipt) {
                    console.log(`Transaction hash sent: ${receipt.transactionHash}`);
                })
                .on('error', function (error) {
                    console.log("Transaction error: " + error);
                });
            lastProcessedLocalNonce = nonce;
            fs.writeFile("/Users/szabolcs/Documents/Personal/Szakmai/Ethereum/character-hub/scripts/.last_processed_local_nonce", lastProcessedLocalNonce.toString(), err => {
                if (err) {
                    console.error(err)
                    return
                }
            })
        }
    }
    lastProcessedBlockHeight = blockHeight;
    fs.writeFile("/Users/szabolcs/Documents/Personal/Szakmai/Ethereum/character-hub/scripts/.last_processed_local_block_number", lastProcessedBlockHeight.toString(), err => {
        if (err) {
            console.error(err)
            return
        }
    })
}

setInterval(() => {
    web3Local.eth.getBlockNumber().then(blockNumber => {
        pollLocal(blockNumber);
    })
        .catch(error => console.log(error.message));
}, 10000);



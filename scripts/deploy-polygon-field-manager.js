// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
const TokenProxy = require('../src/contracts/TokenProxy.json');

async function main() {
    // Hardhat always runs the compile task when running scripts with its command
    // line interface.
    //
    // If this script is run directly using `node` you may want to call compile
    // manually to make sure everything is compiled
    // await hre.run('compile');


    [account1, account2, account3] = await ethers.getSigners();
    console.log(account1.address)
    console.log(account2.address)
    console.log(account3.address)

    // We get the contract to deploy
    const FieldManager = await hre.ethers.getContractFactory("FieldManager");
    const fieldManager = await FieldManager.deploy(TokenProxy.address);

    await fieldManager.deployed();

    console.log("FieldManager deployed to:", fieldManager.address);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

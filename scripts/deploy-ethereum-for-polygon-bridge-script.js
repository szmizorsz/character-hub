// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
    // Hardhat always runs the compile task when running scripts with its command
    // line interface.
    //
    // If this script is run directly using `node` you may want to call compile
    // manually to make sure everything is compiled
    // await hre.run('compile');

    // We get the contract to deploy
    const Bridge = await hre.ethers.getContractFactory("Bridge");
    const bridge = await Bridge.deploy();

    await bridge.deployed();

    console.log("Bridge deployed to:", bridge.address);

    [account1, account2, account3] = await ethers.getSigners();
    console.log(account1.address)
    console.log(account2.address)
    console.log(account3.address)

    const meralMetaDataIpfsCIDs = [
        "QmPQ8xVwdNBEG9XSyCzFsca4QjPxtd3c1u9epu289W4tBK",
        "QmTeocEj1KrAyuuyAneM6Vxga7jNUXc8PbbehSZuQUFmjS",
        "QmbudFyd3D2ivZFZuUPPvBki1DzXZBGfbBPu1RQB2yS3nS",
        "QmU4deYmmoPEs1BiFxB36UB4ryDXoEfLdj3SPW6hHjWZsD"];

    const nftOwner1 = "0x0f5b2FD00d4A2Bc6F0Fb01d375Bb089d2cA8631d";
    const nftOwner2 = "0xC0F3b367AF79DEd43dBFd8e7026c1b1Db58D7b87";

    const ERC721Mock = await hre.ethers.getContractFactory("ERC721Mock");
    const meralMock = await ERC721Mock.deploy();
    await meralMock.deployed();
    console.log("Meral mock deployed to:", meralMock.address);

    await meralMock.mint(nftOwner1, 0);
    await meralMock.setTokenURI(0, meralMetaDataIpfsCIDs[0]);

    await meralMock.mint(nftOwner1, 1);
    await meralMock.setTokenURI(1, meralMetaDataIpfsCIDs[1]);

    await meralMock.mint(nftOwner2, 2);
    await meralMock.setTokenURI(2, meralMetaDataIpfsCIDs[2]);

    await meralMock.mint(nftOwner2, 3);
    await meralMock.setTokenURI(3, meralMetaDataIpfsCIDs[3]);

    const orcMetaDataIpfsCIDs = [
        "Qme24aWZGmb1AmWKNyZS6yn48SShAF8oP6d7Pi1kgmz5Lq",
        "QmbumFYQDfRAFzDrWgg6NvdRKiEPeunm1kvahFNm9JqvJ5",
        "QmXXqvDtq3uwbdzpPSiTQ61Y7TqMgDnHao6SFkLBLo5D4Z"];

    const orcMock = await ERC721Mock.deploy();
    await orcMock.deployed();
    console.log("Orc mock deployed to:", orcMock.address);

    await orcMock.mint(nftOwner1, 0);
    await orcMock.setTokenURI(0, orcMetaDataIpfsCIDs[0]);

    await orcMock.mint(nftOwner1, 1);
    await orcMock.setTokenURI(1, orcMetaDataIpfsCIDs[1]);

    await orcMock.mint(nftOwner2, 2);
    await orcMock.setTokenURI(2, orcMetaDataIpfsCIDs[2]);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

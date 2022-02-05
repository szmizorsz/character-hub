const { expect } = require("chai");
const { ethers, network, waffle } = require('hardhat');

describe("Bridge deposit test", function () {
    let bridge;
    let erc721Mock;
    let nftOwner;
    const originalTokenId = 1;
    const tokenURI = "http://tokenURI"

    beforeEach(async function () {
        provider = ethers.getDefaultProvider("http://localhost:8545");
        [account1, account2, account3] = await ethers.getSigners();

        const Bridge = await ethers.getContractFactory("Bridge");
        bridge = await Bridge.deploy();
        await bridge.deployed();

        const ERC721Mock = await ethers.getContractFactory("ERC721Mock");
        erc721Mock = await ERC721Mock.deploy();
        await erc721Mock.deployed();

        nftOwner = account1;
        await erc721Mock.mint(nftOwner.address, originalTokenId);
        await erc721Mock.setTokenURI(originalTokenId, tokenURI);
    });

    it("Should desposit NFT with locking to the bridge", async function () {
        await erc721Mock.connect(nftOwner).approve(bridge.address, originalTokenId);
        await expect(bridge.connect(nftOwner).deposit(erc721Mock.address, originalTokenId, true))
            .to.emit(bridge, 'TokenDeposit')
            .withArgs(0, erc721Mock.address, originalTokenId, nftOwner.address, tokenURI, true, 0);

        let newOwner = await erc721Mock.ownerOf(originalTokenId);
        expect(newOwner).to.equal(bridge.address);

        let actualBridgeId = await bridge.id();
        expect(actualBridgeId).to.equal(1);

        let depositedToken = await bridge.allDepositsById(0);
        expect(depositedToken.contractAddress).to.equal(erc721Mock.address);
        expect(depositedToken.tokenId).to.equal(originalTokenId);
        expect(depositedToken.owner).to.equal(nftOwner.address);
        expect(depositedToken.withLocking).to.equal(true);
    });


    it("Should desposit NFT without locking to the bridge", async function () {
        await expect(bridge.connect(nftOwner).deposit(erc721Mock.address, originalTokenId, false))
            .to.emit(bridge, 'TokenDeposit')
            .withArgs(0, erc721Mock.address, originalTokenId, nftOwner.address, tokenURI, false, 0);

        let newOwner = await erc721Mock.ownerOf(originalTokenId);
        expect(newOwner).to.equal(nftOwner.address);

        let actualBridgeId = await bridge.id();
        expect(actualBridgeId).to.equal(1);

        let depositedToken = await bridge.allDepositsById(0);
        expect(depositedToken.contractAddress).to.equal(erc721Mock.address);
        expect(depositedToken.tokenId).to.equal(originalTokenId);
        expect(depositedToken.owner).to.equal(nftOwner.address);
        expect(depositedToken.withLocking).to.equal(false);
    });
});

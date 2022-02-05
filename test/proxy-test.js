const { expect } = require("chai");
const { ethers, network, waffle } = require('hardhat');

describe("Proxy test", function () {
    let nftOwner;
    const originalContractAddress = "0x8f86403A4DE0BB5791fa46B8e795C547942fE4Cf";
    const originalTokenId = 1;
    const tokenURI = "http://tokenURI"

    beforeEach(async function () {
        provider = ethers.getDefaultProvider("http://localhost:8545");
        [account1, account2, account3] = await ethers.getSigners();
        nftOwner = account2;

        const TokenProxy = await ethers.getContractFactory("TokenProxy");
        tokenProxy = await TokenProxy.deploy();
        await tokenProxy.deployed();
    });

    it("Should mint proxy", async function () {
        let bridgeId = 0;
        let withLocking = true;
        let nonce = 0;
        await expect(tokenProxy.mintProxy(bridgeId, originalContractAddress, originalTokenId, nftOwner.address, tokenURI, withLocking, nonce))
            .to.emit(tokenProxy, 'ProxyCreated')
            .withArgs(0, originalContractAddress, originalTokenId, nftOwner.address, tokenURI, withLocking);

        let proxyOwner = await tokenProxy.ownerOf(bridgeId);
        expect(proxyOwner).to.equal(nftOwner.address);

        let nrOfProxies = await tokenProxy.nrOfProxies();
        expect(nrOfProxies).to.equal(1);

        let proxy = await tokenProxy.getProxyById(0);
        expect(proxy.bridgeId).to.equal(bridgeId);
        expect(proxy.originalContractAddress).to.equal(originalContractAddress);
        expect(proxy.originalTokenId).to.equal(originalTokenId);
        expect(proxy.owner).to.equal(nftOwner.address);
        expect(proxy.tokenURI).to.equal(tokenURI);
        expect(proxy.withLocking).to.equal(withLocking);
    });

});

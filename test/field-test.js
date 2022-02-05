const { expect } = require("chai");
const { ethers, network, waffle } = require('hardhat');

describe("Field test", function () {
    let tokenProxy;
    let fieldManager;
    let ethemerals;
    let nftOwner;

    beforeEach(async function () {
        provider = ethers.getDefaultProvider("http://localhost:8545");
        [account1, account2, account3] = await ethers.getSigners();
        nftOwner = account2;

        const TokenProxy = await ethers.getContractFactory("TokenProxy");
        tokenProxy = await TokenProxy.deploy();
        await tokenProxy.deployed();

        const FieldManager = await ethers.getContractFactory("FieldManager");
        fieldManager = await FieldManager.deploy(tokenProxy.address);
        await fieldManager.deployed();

        const ERC721Mock = await ethers.getContractFactory("ERC721Mock");
        ethemerals = await ERC721Mock.deploy();
        await ethemerals.deployed();
    });

    it("Should create a field", async function () {
        let fieldName = "ethemerals field";
        let fieldSymbol = "MERALF";

        await fieldManager.connect(account2).createField(fieldName, fieldSymbol);

        let fieldAddress = await fieldManager.fields(0);
        let field = await ethers.getContractAt("Field", fieldAddress);
        let fieldOwner = await field.owner();
        expect(fieldOwner).to.equal(account2.address);
        let name = await field.name();
        expect(name).to.equal(fieldName);
        let symbol = await field.symbol();
        expect(symbol).to.equal(fieldSymbol);
        let nrOfFields = await fieldManager.nrOfFields();
        expect(nrOfFields).to.equal(1);
    });

    it("Should set allowed contracts", async function () {
        let fieldName = "ethemerals field";
        let fieldSymbol = "MERALF";

        await fieldManager.connect(account2).createField(fieldName, fieldSymbol);

        let fieldAddress = await fieldManager.fields(0);
        let field = await ethers.getContractAt("Field", fieldAddress);

        let isEthemeralAllowed = await field.allowedContracts(ethemerals.address);
        expect(isEthemeralAllowed).to.equal(false);
        await field.connect(account2).setAllowedContract(ethemerals.address, true);
        isEthemeralAllowed = await field.allowedContracts(ethemerals.address);
        expect(isEthemeralAllowed).to.equal(true);
        let allowedContractsArray = await field.getAllowedContracts();
        expect(allowedContractsArray.length).to.equal(1);

        // let isAllContractAllowed = await field.allContractsAllowed();
        // expect(isAllContractAllowed).to.equal(false);
        // await field.connect(account2).setAllContractsAllowed(true);
        // let isAllContractAllowed = await field.allContractsAllowed();
        // expect(isAllContractAllowed).to.equal(false);
        // isAllContractAllowed = await field.allContractsAllowed();
        // expect(isAllContractAllowed).to.equal(true);
    });

    it("Should mint player", async function () {
        let fieldName = "ethemerals field";
        let fieldSymbol = "MERALF";

        await fieldManager.connect(account2).createField(fieldName, fieldSymbol);

        let fieldAddress = await fieldManager.fields(0);
        let field = await ethers.getContractAt("Field", fieldAddress);
        await field.connect(account2).setAllowedContract(ethemerals.address, true);

        let bridgeId = 0;
        let withLocking = true;
        let nonce = 0;
        let originalContractAddress = ethemerals.address;
        let originalTokenId = 1;
        let tokenURI = "http://tokenURI"
        await tokenProxy.mintProxy(bridgeId, originalContractAddress, originalTokenId, nftOwner.address, tokenURI, withLocking, nonce);

        let proxyId = 0;
        await field.connect(account2).mintPlayer(proxyId, nftOwner.address, originalContractAddress, tokenURI);

        let norOfPlayers = await field.playerId();
        expect(norOfPlayers).to.equal(1);

        let player = await field.getPlayerDataById(proxyId);
        expect(player._originalContractAddress).to.equal(originalContractAddress);
        expect(player._originalTokenId).to.equal(originalTokenId);
        expect(player._owner).to.equal(nftOwner.address);
        expect(player._tokenURI).to.equal(tokenURI);
        expect(player._proxyId).to.equal(0);

        // let bridgeId = 0;
        // let withLocking = true;
        // let nonce = 0;
        // let originalContractAddress = ethemerals.address;
        // let originalTokenId = 1;
        // let tokenURI = "http://tokenURI"
        // await tokenProxy.mintProxy(bridgeId, originalContractAddress, originalTokenId, nftOwner.address, tokenURI, withLocking, nonce);

        // let proxyId = 0;
        // await field.connect(account2).mintPlayer(proxyId, nftOwner.address, originalContractAddress, tokenURI);

        let proxyIdHasPlayer = await field.proxyIdHasPlayer(proxyId);
        expect(proxyIdHasPlayer).to.equal(true);

        bridgeId = 1;
        originalTokenId = 2;
        nonce = 1;
        await tokenProxy.mintProxy(bridgeId, originalContractAddress, originalTokenId, nftOwner.address, tokenURI, withLocking, nonce);

        proxyId = 1;
        await field.connect(account2).mintPlayer(proxyId, nftOwner.address, originalContractAddress, tokenURI);

        norOfPlayers = await field.playerId();
        expect(norOfPlayers).to.equal(2);

        proxyIdHasPlayer = await field.proxyIdHasPlayer(proxyId);
        expect(proxyIdHasPlayer).to.equal(true);

        proxyIdHasPlayer = await field.proxyIdHasPlayer(proxyId + 1);
        expect(proxyIdHasPlayer).to.equal(false);
    });
});

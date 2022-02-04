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

  const meralMetaDataIpfsCIDs = [
    "QmPQ8xVwdNBEG9XSyCzFsca4QjPxtd3c1u9epu289W4tBK",
    "QmTeocEj1KrAyuuyAneM6Vxga7jNUXc8PbbehSZuQUFmjS",
    "QmbudFyd3D2ivZFZuUPPvBki1DzXZBGfbBPu1RQB2yS3nS",
    "QmU4deYmmoPEs1BiFxB36UB4ryDXoEfLdj3SPW6hHjWZsD"];

  const ERC721Mock = await hre.ethers.getContractFactory("ERC721Mock");
  const meralMock = await ERC721Mock.deploy();
  await meralMock.deployed();
  console.log("Meral mock deployed to:", meralMock.address);

  await meralMock.mint(account1.address, 0);
  await meralMock.setTokenURI(0, meralMetaDataIpfsCIDs[0]);

  await meralMock.mint(account1.address, 1);
  await meralMock.setTokenURI(1, meralMetaDataIpfsCIDs[1]);

  await meralMock.mint(account2.address, 2);
  await meralMock.setTokenURI(2, meralMetaDataIpfsCIDs[2]);

  await meralMock.mint(account1.address, 3);
  await meralMock.setTokenURI(3, meralMetaDataIpfsCIDs[3]);

  const orcMetaDataIpfsCIDs = [
    "QmVT16XpzkiyonH5iJ3bRy67vzFyUcaX6qNT2XRsoNB814",
    "QmfKwGZFfbcFSxwkMkRWwVVqYx8JdSTg9YDoytfQs69fyQ",
    "QmSHqtMazpwrxcwdbg3wZS33KR26ECAz7vY6UbthhGTFfD"];

  const orcMock = await ERC721Mock.deploy();
  await orcMock.deployed();
  console.log("Orc mock deployed to:", orcMock.address);

  await orcMock.mint(account1.address, 0);
  await orcMock.setTokenURI(0, orcMetaDataIpfsCIDs[0]);

  await orcMock.mint(account1.address, 1);
  await orcMock.setTokenURI(1, orcMetaDataIpfsCIDs[1]);

  await orcMock.mint(account2.address, 2);
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

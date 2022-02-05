//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "hardhat/console.sol";

contract TokenProxy is Ownable, ERC721URIStorage {
    struct Token {
        address originalContractAddress;
        uint256 originalTokenId;
        bool withLocking;
    }

    mapping(uint256 => Token) public allProxiesById;
    uint256 public nrOfProxies;

    event ProxyCreated(
        uint256 id,
        address originalContractAddress,
        uint256 originalTokenId,
        address owner,
        string tokenURI,
        bool withLocking
    );

    constructor() ERC721("NFT proxy", "NFTProxy") {}

    function mintProxy(
        uint256 bridgeId,
        address originalContractAddress,
        uint256 originalTokenId,
        address owner,
        string memory tokenURI,
        bool withLocking
    ) public onlyOwner {
        _mint(owner, bridgeId);
        Token memory token;
        token.originalContractAddress = originalContractAddress;
        token.originalTokenId = originalTokenId;
        token.withLocking = withLocking;
        allProxiesById[bridgeId] = token;

        _setTokenURI(bridgeId, tokenURI);

        nrOfProxies++;

        emit ProxyCreated(
            bridgeId,
            originalContractAddress,
            originalTokenId,
            owner,
            tokenURI,
            withLocking
        );
    }

    function getProxyById(uint256 id)
        public
        view
        returns (
            uint256 bridgeId,
            address originalContractAddress,
            uint256 originalTokenId,
            address owner,
            string memory tokenURI,
            bool withLocking
        )
    {
        return (
            id,
            allProxiesById[id].originalContractAddress,
            allProxiesById[id].originalTokenId,
            ownerOf(id),
            super.tokenURI(id),
            allProxiesById[id].withLocking
        );
    }
}

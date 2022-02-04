// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract ERC721Mock is ERC721URIStorage {
    constructor() ERC721("NFT coin", "NFT") {}

    function mint(address to, uint256 tokenId) public {
        _mint(to, tokenId);
    }

    function setTokenURI(uint256 tokenId, string memory tokenURI) public {
        _setTokenURI(tokenId, tokenURI);
    }
}

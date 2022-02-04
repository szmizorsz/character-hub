//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";
import "hardhat/console.sol";

contract Bridge is Ownable, ERC721Holder {
    struct Token {
        address contractAddress;
        uint256 tokenId;
        address owner;
    }

    uint256 public id;
    mapping(uint256 => Token) public allDepositsById;

    event TokenDeposit(
        uint256 id,
        address contractAddress,
        uint256 tokenId,
        address owner,
        string tokenURI
    );

    function depositWithLocking(address _contractAddress, uint256 _tokenId)
        public
    {
        ERC721 erc721Contract = ERC721(_contractAddress);
        require(erc721Contract.ownerOf((_tokenId)) == msg.sender, "only owner");

        Token memory token;
        token.contractAddress = _contractAddress;
        token.tokenId = _tokenId;
        token.owner = msg.sender;
        allDepositsById[id] = token;

        erc721Contract.safeTransferFrom(msg.sender, address(this), _tokenId);
        string memory tokenURI = erc721Contract.tokenURI(_tokenId);

        emit TokenDeposit(id, _contractAddress, _tokenId, msg.sender, tokenURI);
        id++;
    }
}

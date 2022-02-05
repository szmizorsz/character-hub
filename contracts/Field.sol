//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "hardhat/console.sol";
import "./TokenProxy.sol";

contract Field is Ownable, ERC721URIStorage {
    string public fieldImageURL;
    mapping(address => bool) public allowedContracts;
    bool public allContractsAllowed;
    TokenProxy tokenProxy;
    uint256 public playerId;
    mapping(uint256 => uint256) playerIdToProxyId;
    mapping(uint256 => uint256) proxyIdToPlayerId;
    uint256 public player0proxyId;

    constructor(
        address _tokenProxy,
        string memory fieldName,
        string memory fieldSymbol,
        string memory _fieldImageURL
    ) ERC721(fieldName, fieldSymbol) {
        tokenProxy = TokenProxy(_tokenProxy);
        fieldImageURL = _fieldImageURL;
    }

    function setAllowedContract(address _contract, bool allowed)
        public
        onlyOwner
    {
        allowedContracts[_contract] = allowed;
    }

    function setAllContractsAllowed(bool allowed) public onlyOwner {
        allContractsAllowed = allowed;
    }

    function mintPlayer(
        uint256 proxyId,
        address owner,
        address originalContractAddress,
        string memory tokenURI
    ) public {
        address proxyOwner = tokenProxy.ownerOf(proxyId);
        require(msg.sender == proxyOwner, "only proxy owner");
        require(
            allowedContracts[originalContractAddress] == true ||
                allContractsAllowed == true,
            "player not allowed from this contract"
        );
        _mint(owner, playerId);
        _setTokenURI(playerId, tokenURI);
        playerIdToProxyId[playerId] = proxyId;
        proxyIdToPlayerId[proxyId] = playerId;
        if (playerId == 0) {
            player0proxyId = proxyId;
        }
        playerId++;
    }

    function getPlayerDataById(uint256 _playerId)
        public
        view
        returns (
            address _originalContractAddress,
            uint256 _originalTokenId,
            address _owner,
            string memory _tokenURI,
            uint256 _proxyId
        )
    {
        _proxyId = playerIdToProxyId[_playerId];
        uint256 bridgeId;
        bool withLocking;
        (
            bridgeId,
            _originalContractAddress,
            _originalTokenId,
            _owner,
            _tokenURI,
            withLocking
        ) = tokenProxy.getProxyById(_proxyId);
    }

    function proxyIdHasPlayer(uint256 _proxyId) public view returns (bool) {
        if (_proxyId == player0proxyId) {
            return true;
        }
        // else {
        //     return proxyIdToPlayerId[_proxyId] > 0 ? true : false;
        // }
        return proxyIdToPlayerId[_proxyId] != 0 ? true : false;
    }
}

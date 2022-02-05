//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "./Field.sol";
import "./TokenProxy.sol";

contract FieldManager {
    Field[] public fields;
    TokenProxy tokenProxy;

    constructor(address _tokenProxy) {
        tokenProxy = TokenProxy(_tokenProxy);
    }

    function createField(string memory fieldName, string memory fieldSymbol)
        public
    {
        Field field = new Field(address(tokenProxy), fieldName, fieldSymbol);
        fields.push(field);
        field.transferOwnership(msg.sender);
    }

    function nrOfFields() public view returns (uint256) {
        return fields.length;
    }

    // function getFieldData(uint256 fieldId) returns(uint256, uint25) {
    //     return fields[filedId].playerId;
    // }
}

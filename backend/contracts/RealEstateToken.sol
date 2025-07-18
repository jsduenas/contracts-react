// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract RealEstateToken is ERC20, Ownable {
    string public propertyURI;

    constructor(uint256 initialSupply, string memory _propertyURI)
        ERC20("Real Estate Token", "RET") Ownable(msg.sender)
    {
        _mint(msg.sender, initialSupply * 10 ** decimals());
        propertyURI = _propertyURI;
    }

    function updatePropertyURI(string memory _newURI) external onlyOwner {
        propertyURI = _newURI;
    }

    function getPropertyURI() external view returns (string memory) {
        return propertyURI;
    }
}


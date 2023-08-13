// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract GameDayToken is ERC20, AccessControl, Ownable{
    address currentOwner;
    constructor( uint256 initialSupply) ERC20("GameDay", "GDT") {
       
      _mint(msg.sender, initialSupply *
       10**18);
      currentOwner = msg.sender;

    }
     function transferOwnership(address _treasuryAddress) public override{
    currentOwner = _treasuryAddress;
    }
    
    

    function mintfn(address to, uint256 amount) public {
        require(currentOwner == msg.sender, "Not the owner");
        _mint(to, amount);
    }
}
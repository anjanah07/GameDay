// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
import "./GDT.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract GDTtreasury{
    address gameDayAddress;
     GameDayToken  gameDaytoken;
    constructor(address _gameDayTokenAddress){
        gameDaytoken = GameDayToken(_gameDayTokenAddress);
        gameDayAddress = _gameDayTokenAddress;
    }
  
    function mintGDT( uint amount) public{
        gameDaytoken.mintfn(address(this), amount);
    }
    function seeBalance() public view returns (uint256){
        uint256 balanceGDT = IERC20(gameDayAddress).balanceOf(address(this));
        return balanceGDT;
    }
   
    function exchange() public payable returns(bool){
        uint256 decimal = 1;
        uint256 tokenPriceInWei = 0.01 * 10**16; // Cost of 1 token = 0.0001 ether

        uint256 noOfGDTs = (msg.value*decimal)/tokenPriceInWei;
        require(seeBalance()> noOfGDTs, "Not enough GDT in treasury");
        bool result = IERC20(gameDayAddress).transfer(msg.sender, noOfGDTs);
        return result;
    }


}
// contracts/INRToken.sol

pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract INRToken is ERC20 {

    constructor() ERC20("Digital Rupee", "INR") {
        _mint(msg.sender, 100000 * 10 ** decimals());
    }

}
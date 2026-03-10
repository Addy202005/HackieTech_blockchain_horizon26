// ShareToken.sol

pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ShareToken is ERC20 {

    constructor() ERC20("TCS Share Token", "TCS") {
        _mint(msg.sender, 1000 * 10 ** decimals());
    }

}
// contracts/Settlement.sol

pragma solidity ^0.8.20;

import "./ShareToken.sol";
import "./INRToken.sol";

contract Settlement {

    ShareToken public shareToken;
    INRToken public inrToken;

    constructor(address _shareToken, address _inrToken) {
        shareToken = ShareToken(_shareToken);
        inrToken = INRToken(_inrToken);
    }

    function settleTrade(
        address buyer,
        address seller,
        uint256 shareAmount,
        uint256 price
    ) public {

        uint256 totalPayment = shareAmount * price;

        require(
            inrToken.transferFrom(buyer, seller, totalPayment),
            "Payment failed"
        );

        require(
            shareToken.transferFrom(seller, buyer, shareAmount),
            "Share transfer failed"
        );
    }
}
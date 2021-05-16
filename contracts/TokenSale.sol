pragma solidity >=0.4.22 <0.9.0;
import "./Token.sol";

contract TokenSale{

    address admin;
    Token public tokenContract;
    uint public tokenPrice;
    uint public tokensSold;

    event Sell(
        address _buyer, 
        uint _amount
    );

    constructor(Token _tokenContract,uint _tokenPrice) public {
        admin = msg.sender;
        tokenContract = _tokenContract;
        tokenPrice = _tokenPrice;
    }

    function multiply(uint x, uint y) internal pure returns (uint z) {
        require(y == 0 || (z = x * y) / y == x, "ds-math-mul-overflow");
    }

    function buyTokens(uint _numberOfTokens) public payable{
        require(msg.value == multiply(_numberOfTokens,tokenPrice));
        require(tokenContract.balanceOf(address(this)) >= _numberOfTokens);
        require(tokenContract.transfer(msg.sender,_numberOfTokens));

        tokensSold += _numberOfTokens;
        emit Sell(msg.sender, _numberOfTokens);
    }
}
pragma solidity >=0.4.22 <0.9.0;

contract Token{

    uint public totalSupply;
    string public symbol = 'ERH';
    string public name = 'Earthen';
    string public standard = 'Earthen v1.0';
    mapping(address => uint) public balanceOf;
    
    event Transfer(
        address indexed _from,
        address indexed _to,
        uint value
    );
    constructor(uint _initialSupply) public{
        balanceOf[msg.sender] = _initialSupply;
        totalSupply = _initialSupply;
    }

    function transfer(address _to, uint _value) public returns (bool){
        require(balanceOf[msg.sender] >= _value);
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;

        emit Transfer(msg.sender, _to, _value);

        return true;
    }
}
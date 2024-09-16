pragma solidity ^0.5.16;

contract Rewards {
    string public name = 'FF Web 3';
    string public symbol = 'FFW3';
    uint256 public totalSupply = 1000000000000000000000000 ;// 18 zeros, 1 milloin tokens
    uint8 public decimals = 18;

    // events allow us to show data to the fornt end when a function is executed
    // events are not stored in memory thus have a less cost than storage
    // Indexing allows filtering on the property and only 3 can be used in an event
    event Transfer(
        address indexed _from,
        address indexed _to,
        uint _value
    );

    event Approval(
        address indexed _owner,
        address indexed _spender,
        uint _value
    );

    mapping (address => uint) public balanceOf;
    mapping (address => mapping (address => uint)) public allowance;

    constructor() public {
        balanceOf[msg.sender] = totalSupply; 
    }

    function approve(address _spender, uint256 _value) public returns ( bool success) {
        allowance[msg.sender][_spender] = _value;  
        emit Approval(msg.sender, _spender, _value);
        return true;
    }

    function transfer(address _to, uint256 _value) public returns (bool success){
        require( balanceOf[msg.sender] >= _value); // require amount to be less or equal whats is available in  balance
        balanceOf[msg.sender] -= _value; // reduce amount from sender 
        balanceOf[_to]  += _value; // add
        emit Transfer(msg.sender, _to, _value);
        return true;
    }

    // third party transfer
    function transferFrom(address _from, address _to, uint256 _value) public returns ( bool success) {
        require( balanceOf[_from] >= _value); 
        require( allowance[_from] [msg.sender] >= _value); 
        
        balanceOf[_from] -= _value; 
        allowance[msg.sender][_from] -= _value; 
        balanceOf[_to]  += _value; 

        emit Transfer(_from, _to, _value);
        return true;
    }
}
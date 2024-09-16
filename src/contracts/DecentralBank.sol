pragma solidity ^0.5.16;

import "./Rewards.sol";
import "./Tether.sol";

contract DecentralBank {
    string public name = "Decentral Bank";
    address public owner;
    Tether public tether;
    Rewards public rewards;

    address[] public stakers;

    mapping(address => uint) public stakingBalance;
    mapping(address => bool) public hasStaked;
    mapping(address => bool) public isStaking;


    constructor(Rewards _rewards, Tether _tether) public {
        tether = _tether;
        rewards = _rewards;
        owner = msg.sender;
    }

    function depositTokens(uint _amount) public {

        // Require the  amount to be greater than zero
        require(_amount > 0,'amount must be greater than 0');

        // Transfer Thether tokens to this contract for staking
        tether.approve(msg.sender,_amount);
        tether.transferFrom(msg.sender, address(this), _amount);

        // Append balance
        stakingBalance[msg.sender] += _amount;

        if(hasStaked[msg.sender] == false){
            stakers.push(msg.sender);
        }

        // Update staking info
        hasStaked[msg.sender] = true;
        isStaking[msg.sender] = true;
    }

    // Issue rewards function
    function issueRewards() public {
        // only owner can run this
        require(msg.sender == owner, 'only owner can issue tokens');

        // Loop through staker addresses 
        for (uint i=0; i<stakers.length; i++)
        {
            address recipient = stakers[i];
            uint balance = stakingBalance[recipient];
            uint stakingReward = balance / 9;
            // check if they are currently staking
            if(balance > 0){
                rewards.transfer(recipient, stakingReward);
            }
        }

    }

    // Unstake function: withdraw tether tokens
    function unstakeRewards(uint amount) public {
        uint balance = stakingBalance[msg.sender];

        // only owner can run this
        require(balance > 0 , 'your balance cant be less than 0');
        // only owner can run this
        require(amount <= balance, 'you cannot unstake more than your balance');   
       
        tether.transfer(msg.sender, amount);
        stakingBalance[msg.sender] -= amount;
        
        if(stakingBalance[msg.sender] <= 0){
            isStaking[msg.sender] = false;
        }
    }
}

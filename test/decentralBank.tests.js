const { assert } = require('chai');
const { default: Web3 } = require('web3');

// Bring in contracts we want to test
const Tether = artifacts.require("Tether");
const Rewards = artifacts.require("Rewards");
const DecentralBank = artifacts.require("DecentralBank");

require('chai')
.use(require('chai-as-promised'))
.should()

contract('decentralBank', ([owner, customer]) =>{
    let tether, rewards, decentralBank;

    function tokens(number){
        return web3.utils.toWei(number,'ether');
    }

    before(async () => {
        // load contracts
        tether = await Tether.new();
        rewards = await Rewards.new();
        decentralBank = await DecentralBank.new(rewards.address, tether.address);

        // Transfer all tokens to DecentralBank (1 million)
        await rewards.transfer(decentralBank.address, tokens('1000000'));

        // Transfer 100 mock Tethers to Customer
        await tether.transfer(customer, tokens('100'), {from: owner});
    })

    describe('Mock Tether Deployment', async () =>{
        it('Matched name correctly', async () => {
            const name = await tether.name();
            assert.equal(name, 'Tether');
        })
    })

    describe('Rewards Deployment', async () =>{
        it('Matched name correctly', async () => {
            const name = await rewards.name();
            assert.equal(name, 'FF Web 3');
        })
    })

    describe('Decentral Bank Deployment', async () =>{
        it('Matched name correctly', async () => {
            const name = await decentralBank.name();
            assert.equal(name, 'Decentral Bank');
        })

        it('Cantract has tokens', async () => {
           let balance = await rewards.balanceOf(decentralBank.address);
           assert.equal(balance.toString(), tokens('1000000'));
        } )
    })

    describe('Yeild Farming', async ()=>{
        it('Rewards for staking', async () => {
            let result;
        
            // Check investor balance
            result = await tether.balanceOf(customer);
            assert.equal(result.toString(), tokens('100'), 'user has 100 tether tokens');
        
            // Check investor can deposit tether into our bank
            await tether.approve(decentralBank.address, tokens('100'),{from: customer});
            await decentralBank.depositTokens(tokens('100'),{from: customer});
        
            // Check investor new tether balance
            result = await tether.balanceOf(customer);
            assert.equal(result.toString(), tokens('0'), 'user has 0  tether tokens');
        
            // Check decentral bank new balance
            result = await tether.balanceOf(decentralBank.address);
            assert.equal(result.toString(), tokens('100'), 'Bank gets the users 100 tether tokens');
        
            // Check that the investors balance is staked in DecentralBank
            result = await decentralBank.stakingBalance(customer);
            assert.equal(result.toString(), tokens('100'), 'User has 100 tokens staked');

            // Check issue token
            await decentralBank.issueRewards({from:owner});
                        
            // Check only owner can issue token
            await decentralBank.issueRewards({from:customer}).should.be.rejected;

            // Check unstake
            await decentralBank.unstakeRewards(tokens('100'),{from:customer});

            // Check staked balance in Customer
            result = await decentralBank.stakingBalance(customer);
            assert.equal(result.toString(), tokens('0'), 'User has 0 tokens staked in our bank');

            // Check investor  Tether balance is restored
            result = await tether.balanceOf(customer);
            assert.equal(result.toString(), tokens('100'), 'user gets 100 tether tokens back');

            // Check decentral bank new balance
            result = await tether.balanceOf(decentralBank.address);
            assert.equal(result.toString(), tokens('0'), 'Bank has 0 tethertokens');

            // Check customer is no longer staking
            result = await decentralBank.isStaking(customer);
            assert.equal(result.toString(), 'false', 'Customer is no longer staking');
        })

    })

})

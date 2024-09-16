const { cwd } = require("process");

const DecentralBank = artifacts.require("DecentralBank");

module.exports = async function issueRewardsTokens(callback){

    let decentralBank = await DecentralBank.deployed();
    decentralBank.issueRewards();
    console.log('Reward tokens have been issued successfully');
    callback();
}
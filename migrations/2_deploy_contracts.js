const Tether = artifacts.require("Tether");
const Rewards = artifacts.require("Rewards");
const DecentralBank = artifacts.require("DecentralBank");


module.exports = async function(deployer, network, accounts) {
  // Deploy Mock Tether
  await deployer.deploy(Tether);
  const tether = await Tether.deployed();
  
  // Deploy Rewards Token
  await deployer.deploy(Rewards);
  const rewards = await Rewards.deployed();
  
  // Deploy Decentral Bank
  await deployer.deploy(DecentralBank, rewards.address, tether.address);
  const decentralBank = await DecentralBank.deployed();

  // Transfer all reward tokens to Decentral Bank
  await rewards.transfer(decentralBank.address, '1000000000000000000000000');

  // Distribute 100 Tether tokens to invester
  await tether.transfer(accounts[1],'100000000000000000000')

};

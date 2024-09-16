const Tether = artifacts.require("Tether");

contract("Tether", (accounts) => {
    let tetherInstance;
    const MILLION_WEI = web3.utils.toWei("1000000", "ether");

    before(async () => {
        tetherInstance = await Tether.deployed();
    });

    // it("should have the correct initial values", async () => {
    //     const name = await tetherInstance.name();
    //     assert.equal(name, "Tether", "Name should be 'Tether'");

    //     const symbol = await tetherInstance.symbol();
    //     assert.equal(symbol, "USDT", "Symbol should be 'USDT'");

    //     const totalSupply = await tetherInstance.totalSupply();
    //     assert.equal(totalSupply.toString(), MILLION_WEI, "Total supply should be 1 million tokens");

    //     const decimals = await tetherInstance.decimals();
    //     assert.equal(decimals.toString(), "18", "Decimals should be 18");
    // });

    // it("should have the correct initial balance for the contract creator", async () => {
    //     const balance = await tetherInstance.balanceOf(accounts[0]);
    //     assert.equal(balance.toString(), MILLION_WEI, "Initial balance should be 1 million tokens");
    // });

    // it("should allow a transfer of tokens", async () => {
    //     const amount = web3.utils.toWei("1", "ether"); // 1 token
    //     const to = accounts[1];

    //     const tx = await tetherInstance.transfer(to, amount);

    //     const senderBalance = await tetherInstance.balanceOf(accounts[0]);
    //     const receiverBalance = await tetherInstance.balanceOf(to);

    //     assert.equal(senderBalance.toString(), (MILLION_WEI - amount).toString(), "Sender balance should decrease by 1 token");
    //     assert.equal(receiverBalance.toString(), amount, "Receiver balance should increase by 1 token");
    // });

    // it("should allow approval and return the correct allowance", async () => {
    //     const spender = accounts[1];
    //     const approvalAmount = web3.utils.toWei("0.5", "ether"); // 0.5 token

    //     await tetherInstance.approve(spender, approvalAmount);

    //     const allowedAmount = await tetherInstance.allowance(accounts[0], spender);
    //     assert.equal(allowedAmount.toString(), approvalAmount, "Allowance should match the approved amount");
    // });

    // it("should allow a transferFrom with proper approval", async () => {
    //     const from = accounts[0];
    //     const to = accounts[2];
    //     const spender = accounts[1];
    //     const amount = web3.utils.toWei("0.5", "ether"); // 0.5 token

    //     await tetherInstance.transferFrom(from, to, amount, { from: spender });

    //     const senderBalance = await tetherInstance.balanceOf(from);
    //     const receiverBalance = await tetherInstance.balanceOf(to);

    //     assert.equal(senderBalance.toString(), (MILLION_WEI - amount).toString(), "Sender's balance should decrease by 0.5 token");
    //     assert.equal(receiverBalance.toString(), amount, "Receiver's balance should increase by 0.5 token");
    // });
});

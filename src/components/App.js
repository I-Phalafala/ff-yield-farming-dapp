import React, { Component } from "react";
import './App.css';
import loader from '../loader.svg';
import Navbar from './Navbar.js';
import Main from './Main.js';
import Web3 from "web3";
import Tether from "../truffle_abis/Tether.json";
import Rewards from "../truffle_abis/Rewards.json";
import DecentralBank from "../truffle_abis/DecentralBank.json"

class App extends Component {

    async UNSAFE_componentWillMount() {
        await this.loadWeb3()
        await this.loadBlockchainData()
    }

    async loadWeb3() {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum)
            await window.ethereum.enable()
        } else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider)
        } else {
            window.alert("No ethereum browser detected! Try Meta Mask")
        }
    }

    async loadBlockchainData() {
        const web3 = window.web3
        const account = await web3.eth.getAccounts()
        this.setState({ account: account[0] })
        console.log(account[0])

        // Get network id
        const networkId = await web3.eth.net.getId()
        console.log(networkId, 'Network Id')

        // Load tether data
        const tetherData = Tether.networks[networkId]
        if (tetherData) {
            const tether = new web3.eth.Contract(Tether.abi, tetherData.address)
            this.setState({ tether: tether })

            let tetherBalance = await tether.methods.balanceOf(this.state.account).call()
            this.setState({ tetherBalance: tetherBalance.toString() })
            console.log(tetherBalance, 'Tether Balance')
        } else {
            window.alert('Error! Tether contract not deployed')
        }


        // Load rewards token data
        const rewardsData = Rewards.networks[networkId]
        if (rewardsData) {
            const rewards = new web3.eth.Contract(Rewards.abi, rewardsData.address)
            this.setState({ rewards: rewards })

            let rewardsBalance = await rewards.methods.balanceOf(this.state.account).call()
            this.setState({ rewardsBalance: rewardsBalance.toString() })
            console.log(rewardsBalance, 'Reward Token Balance')
        } else {
            window.alert('Error! Reward Token contract not deployed')
        }

        // Load Decentral Bank data
        const decentralBankData = DecentralBank.networks[networkId]
        if (decentralBankData) {
            const decentralBank = new web3.eth.Contract(DecentralBank.abi, decentralBankData.address)
            this.setState({ decentralBank: decentralBank })

            let stakingBalance = await decentralBank.methods.stakingBalance(this.state.account).call()
            this.setState({ stakingBalance: stakingBalance.toString() })
            console.log(stakingBalance, 'Staking Balance')
        } else {
            window.alert('Error! Decentral bank contract not deployed')
        }

        this.setState({ loading: false })
    }

    //Staking function

    stakeTokens = async (amount) => {
        this.setState({ loader: true });

        try {
            // Approve tokens
            await this.state.tether.methods.approve(this.state.decentralBank._address, amount).send({ from: this.state.account })
                .on('transactionHash', (hash) => {
                    console.log("Approval Transaction Hash:", hash);
                })
                .on('confirmation', (confirmationNumber, receipt) => {
                    console.log("Approval Confirmation Number:", confirmationNumber);
                    console.log("Approval Receipt:", receipt);
                });

            // Deposit tokens
            await this.state.decentralBank.methods.depositTokens(amount).send({ from: this.state.account })
                .on('transactionHash', (hash) => {
                    console.log("Deposit Transaction Hash:", hash);
                })
                .on('confirmation', (confirmationNumber, receipt) => {
                    console.log("Deposit Confirmation Number:", confirmationNumber);
                    console.log("Deposit Receipt:", receipt);
                });

            // Update state or perform other actions upon successful staking
            console.log("Staking successful!");
        } catch (error) {
            // Handle error, e.g., show an error message to the user
            console.error("Error during staking:", error);
        }

        this.setState({ loader: false });
    };


    // Unstaking function
    unstakeTokens = async (amount) => {
        this.setState({ loader: true });

        try {
            // Unstake tokens
            await this.state.decentralBank.methods.unstakeRewards(amount).send({ from: this.state.account })
                .on('transactionHash', (hash) => {
                    console.log("Unstake Transaction Hash:", hash);
                })
                .on('confirmation', (confirmationNumber, receipt) => {
                    console.log("Unstake Confirmation Number:", confirmationNumber);
                    console.log("Unstake Receipt:", receipt);
                });

            // Update state or perform other actions upon successful unstaking
            console.log("Unstaking successful!");
        } catch (error) {
            // Handle error, e.g., show an error message to the user
            console.error("Error during unstaking:", error);
        }

        this.setState({ loader: false });
    };

    constructor(props) {
        super(props);
        this.state = {
            account: '0x0',
            username: 'none',
            tether: {},
            rewards: {},
            decentralBank: {},
            tetherBalance: '0',
            rewardsBalance: '0',
            skakingBalance: '0',
            loading: true
        }
    }

    // Our react code goes in here
    render() {
        let contentMain;
        //check loading before rendering main
        {
            this.state.loading ?
            contentMain = (
                <div className="loader-container">
                    <img src={loader} alt="Loading" />
                </div>
            ) :
            contentMain = <Main tetherBalance={this.state.tetherBalance}
                rewardsBalance={this.state.rewardsBalance}
                stakingBalance={this.state.stakingBalance}
                stakeTokens={this.stakeTokens}
                unstakeTokens={this.unstakeTokens}
            />;
        }
        return (
            <div className="app-body">
                {/* navigtion menu */}
                <Navbar account={this.state.account}
                    username={this.state.username}
                />
                {contentMain}
            </div>


        );
    }
}

export default App;
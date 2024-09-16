import React, { Component } from "react";
import "./Main.css";
import tetherImg from "../tether.png";

class Main extends Component {
    render() {
        return (
            <div className="main-container container-fluid">
                {/* Your content goes here */}
                <div className="row">
                    <main role="main" className="col-lg-12 ml-auto mr-auto">
                        <div id="content" className="mt-3">
                            <div className="card mb-2">
                                <table className="table text-muted text-center">
                                    <thead>
                                        <tr>
                                            <th>Staking balance</th>
                                            <th>Rewards balance</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{window.web3.utils.fromWei(this.props.stakingBalance,'ether')} &nbsp; USDT</td>
                                            <td>{window.web3.utils.fromWei(this.props.rewardsBalance,'ether')} &nbsp;FFT</td>
                                        </tr>
                                    </tbody>

                                </table>
                            </div>

                            <div className=" card mb-2">
                                <div className="card-body">
                                    <form  onSubmit={
                                        (event)=>{
                                            event.preventDefault()
                                            let amount
                                            amount = this.input.value.toString()
                                            amount = window.web3.utils.toWei(amount,'ether')
                                            this.props.stakeTokens(amount)
                                        }
                                    } className="mb-3">
                                        <label className="float-left">Amount</label>
                                        <label className="float-right">Wallet Balance:&nbsp;{window.web3.utils.fromWei(this.props.tetherBalance,'ether')} USDT</label>
                                        <div className="input-group mb-4">
                                            <input
                                                ref={(input)=>{this.input = input}}
                                                type="text"
                                                placeholder="0"
                                                required />

                                            <div className="input-group-open">
                                                <div className="input-group-text">
                                                    <img src={tetherImg} alt="tether" height='30' />
                                                    &nbsp;&nbsp;&nbsp;USDT
                                                </div>
                                            </div>
                                        </div>
                                        <button type="submit" className="btn btn-primary btn-lg btn-block">Deposit</button>
                                    </form>
                                    <button  onClick={
                                        (event)=>{
                                            event.preventDefault()
                                            let amount
                                            amount = this.input.value.toString()
                                            amount = window.web3.utils.toWei(amount,'ether')
                                            this.props.unstakeTokens(amount)
                                        }
                                    }
                                    type="submit" className="btn btn-primary btn-lg btn-block">Withdraw</button>
                                    <div className="card-body text-center">Airdrop</div>
                                </div>
                            </div>

                        </div>
                    </main>
                </div>
            </div>
        );
    }
}

export default Main;
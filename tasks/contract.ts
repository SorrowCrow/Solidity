import { task, types } from "hardhat/config";
import { getWallet, getSecondWallet } from "../lib/wallet";
import { getContractAt } from "@nomiclabs/hardhat-ethers/internal/helpers";
import { Contract } from "ethers";
import { getAddress } from "ethers/lib/utils";
import { getProvider } from "../lib/provider";
// require("dotenv").config();
// const { PUBLIC_KEY18, PUBLIC_KEY19 } = process.env;

task("deploy-contract", "Deploy NFT contract")
    .addParam("contract", "Contract Name", undefined, types.string)
    .addParam("token", "Token Name", undefined, types.string, true)
    .setAction(async (params, hre) => {
        const wallet = getWallet();
        return hre.ethers
            .getContractFactory(params.contract, wallet)
            .then((contractFactory) =>
                params.contract === "ERC20Token"
                    ? contractFactory.deploy()
                    : params.contract === "MyContractERC20Helper"
                    ? contractFactory.deploy(wallet.address, params.token)
                    : params.contract === "MyToken"
                    ? contractFactory.deploy("MyToken", "MT", wallet.address)
                    : contractFactory.deploy(wallet.address)
            )
            .then((result) => {
                process.stdout.write(`Contract address: ${result.address}\n`);
            });
    });

task("call-contract", "Call A contract")
    .addParam("contractAddress", "Contract Address", undefined, types.string)
    .addParam("contractName", "Contract Name", undefined, types.string)
    .setAction(async (params, hre) => {
        const wallet = getSecondWallet();

        return getContractAt(hre, params.contractName, params.contractAddress, wallet).then((contract: Contract) => {
            return contract
                .fallback({
                    //also .buyToken
                    gasLimit: 500_000,
                    // 1000000000000000000n = 1 ETH
                    value: 1000000000000000000n,
                })
                .then(async () => {
                    try {
                        return contract.balances(wallet.address); //tokens after purchase
                    } catch (error) {
                        return "no balances on contract";
                    }
                })
                .then((balance: String) => {
                    console.log(balance);
                });
        });
    });

task("check-balance", "Check address eth")
    .addParam("address", "Address", undefined, types.string)
    .setAction(async (params, hre) => {
        const address = getAddress(params.address);
        const provider = getProvider();
        return provider.getBalance(address).then((balance) => {
            console.log("ETH: " + parseInt(balance._hex, 16) / 1000000000000000000); // 1000000000000000000 = 1 ETH
        });
    });

import("@nomiclabs/hardhat-ethers");
import("@nomiclabs/hardhat-waffle");
import("./tasks/contract");
require("dotenv").config();

import { HardhatUserConfig } from "hardhat/config";

const config: HardhatUserConfig = {
    solidity: "0.8.0",
    defaultNetwork: "hardhat",

    networks: {
        hardhat: {},
    },
};

export default config;

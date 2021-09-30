# react-kbely

## Project setup

    npm i

## local hardhat network

    npx hardhat node

# hardhat tasks ( if (hardhat)network is online )

    npx hardhat <TASK> [TASK OPTIONS]

| TASK            | TASK OPTIONS               | OPTIONAL                  |
| --------------- | -------------------------- | ------------------------- |
| `deploy-contract` | --contract _MyToken_       | --token _0x..._           |
| `call-contract`   | --contract-address _0x..._ | --contract-name _MyToken_ |
| `check-balance`   | --address _0x..._          |

## `deploy-contract`

deploys contract specified in "--contract" from [MyContracts.sol](https://github.com/SorrowCrow/Solidity/blob/main/contracts/MyContracts.sol)

## `call-contract`

calls deployed contract specified in "--contract-name" with an address specified in "--contract-address"

## `check-balance`

prints "--address"'s eth balance

# .env file

.env file contains private and public keys for local hardhat network accounts(yours might be different, change manually)

**Contracts are deployed on (PUBLIC/PRIVATE)\_KEY19**

**Contracts are called from (PUBLIC/PRIVATE)\_KEY18**

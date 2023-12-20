import { ChainId } from '@uniswap/sdk-core'
import { UNIVERSAL_ROUTER_CREATION_BLOCK } from '@uniswap/universal-router-sdk'

/* eslint-env node */
require('dotenv').config()

const REACT_APP_HOST_NAME = process.env.REACT_APP_HOST_NAME;
const forkingConfig = {
  httpHeaders: {
    Origin: `${REACT_APP_HOST_NAME}`, // infura allowlists requests by origin---------localhost:3000
  },
}

const forks = {
  [ChainId.MAINNET]: {
    url: `https://mainnet.infura.io/v3/${process.env.REACT_APP_INFURA_KEY}`,
    // Temporarily hardcoding this to fix e2e tests as we investigate source of swap tests failing on older blocknumbers
    blockNumber: 18537387,
    ...forkingConfig,
  },
  [ChainId.POLYGON]: {
    url: `https://polygon-mainnet.infura.io/v3/${process.env.REACT_APP_INFURA_KEY}`,
    blockNumber: UNIVERSAL_ROUTER_CREATION_BLOCK(ChainId.POLYGON),
    ...forkingConfig,
  },
}

module.exports = {
  forks,
  networks: {
    hardhat: {
      chainId: ChainId.MAINNET,
      forking: forks[ChainId.MAINNET],
      accounts: {
        count: 2,
      },
      mining: {
        auto: true, // automine to make tests easier to write.
        interval: 0, // do not interval mine so that tests remain deterministic
      },
    },
  },
}

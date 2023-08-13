import { HardhatUserConfig, task } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv";

dotenv.config();

task("dep", "Deploy the contracts")
  // .addParam("network", "The network to be deployed to")
  .setAction(async (taskArgs, hre) => {
    // const { network } = taskArgs;
    // console.log(`Deploying to ${network}...`);

    const gameEngine = await hre.ethers.deployContract("GameEngine");

    await gameEngine.waitForDeployment();

    console.log(`GameEngine deployed to ${gameEngine.target}`);
  });

const config: HardhatUserConfig = {
  solidity: "0.8.19",
  networks: {
    // for mainnet
    "base-mainnet": {
      url: "https://mainnet.base.org",
      accounts: [process.env.PRIVATE_KEY as string],
      gasPrice: 1000000000,
    },
    // for testnet
    "base-goerli": {
      url: "https://goerli.base.org",
      accounts: [process.env.PRIVATE_KEY as string],
      gasPrice: 1000000000,
    },
    // for local dev environment
    local: {
      url: "http://localhost:8545",
      accounts: [process.env.PRIVATE_KEY as string],
      gasPrice: 1000000000,
      chainId: 1337,
    },
  },
  defaultNetwork: "hardhat",
};

export default config;

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
    //BASE
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

    // Zora
    // for testnet:
    // GameEngine: 0xcd4D6dE66E59618bc118D0fDec6E26D2e3F9B75b
    // GDT: 0xE7DB63282ff8063680D2809b972514EF122950f5
    // GDTTreasury: 0x63242e61337d829159E1f04e94508A7070054f60
    "zora-goerli": {
      url: "https://testnet.rpc.zora.energy/",
      accounts: [process.env.PRIVATE_KEY as string],
    },
    // for mainnet
    "zora-mainnet": {
      url: "https://mainnet.rpc.zora.energy/",
      accounts: [process.env.PRIVATE_KEY as string],
    },

    // Optimism: 0x20A6199c3AaafE7CafA7d093211682181B413842
    "optimism-goerli": {
      url: "https://goerli.optimism.io",
      accounts: [process.env.PRIVATE_KEY as string],
    },
    // for mainnet
    "optimism-mainnet": {
      url: "https://mainnet.optimism.io",
      accounts: [process.env.PRIVATE_KEY as string],
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

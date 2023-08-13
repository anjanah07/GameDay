// GameEngine deployed to 0x5FbDB2315678afecb367f032d93F642f64180aa3
import { GameEngine__factory } from "../typechain-types/factories/contracts/GameEngine__factory";
import {
  BaseError,
  ContractFunctionRevertedError,
  createPublicClient,
  createWalletClient,
  custom,
  http,
} from "viem";
import {
  baseGoerli,
  localhost,
  optimismGoerli,
  zoraTestnet,
} from "viem/chains";

export const chains = {
  "zora-testnet": zoraTestnet,
  "base-goerli": baseGoerli,
  "optimism-goerli": optimismGoerli,
  localhost: { ...localhost, id: 31337 },
} as const;

export const chainClients = {
  "zora-testnet": createPublicClient({
    chain: zoraTestnet,
    transport: http("https://testnet.rpc.zora.energy/"),
  }),
  "base-goerli": createPublicClient({
    chain: baseGoerli,
    transport: http("https://goerli.base.org"),
  }),
  "optimism-goerli": createPublicClient({
    chain: optimismGoerli,
    transport: http("https://goerli.optimism.io"),
  }),
  localhost: createPublicClient({
    chain: { ...localhost, id: 31337 },
    transport: http(),
  }),
} as const;

export const deployedAddresses = {
  "zora-testnet": "0xcd4D6dE66E59618bc118D0fDec6E26D2e3F9B75b",
  "base-goerli": "0x20A6199c3AaafE7CafA7d093211682181B413842",
  "optimism-goerli": "0x20A6199c3AaafE7CafA7d093211682181B413842",
  localhost: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
} as const;

export type TChainClient = keyof typeof chainClients;

// 0x5FbDB2315678afecb367f032d93F642f64180aa3 - GameEngine Localhost
// 0xcd4D6dE66E59618bc118D0fDec6E26D2e3F9B75b - GameEngine Zora Goerli
export const startGame = async (chain: TChainClient) => {
  console.log("startGame");

  const walletClient = createWalletClient({
    chain: chains[chain],
    transport: custom((window as any).ethereum),
  });

  const [account] = await walletClient.getAddresses();
  const { request } = await chainClients[chain].simulateContract({
    address: deployedAddresses[chain] as `0x${string}`,
    abi: GameEngine__factory.abi,
    functionName: "startGame",
    args: [1],
    account,
  });

  const hash = await walletClient.writeContract(request);

  const tx = await chainClients[chain].waitForTransactionReceipt({ hash });

  console.log({ tx, hash });

  return tx;
};

export const endGame = async (chain: TChainClient) => {
  console.log("endGame");

  const walletClient = createWalletClient({
    chain: chains[chain],
    transport: custom((window as any).ethereum),
  });

  const [account] = await walletClient.getAddresses();
  const { request } = await chainClients[chain].simulateContract({
    address: deployedAddresses[chain] as `0x${string}`,
    abi: GameEngine__factory.abi,
    functionName: "endGame",
    account,
  });

  const hash = await walletClient.writeContract(request);

  const tx = await chainClients[chain].waitForTransactionReceipt({ hash });

  console.log({ tx, hash });

  return tx;
};

export const getUsers = async (chain: TChainClient) => {
  try {
    console.log("getUsers");

    const data = await chainClients[chain].readContract({
      address: deployedAddresses[chain] as `0x${string}`,
      abi: GameEngine__factory.abi,
      functionName: "getUsers",
    });

    // return data;
    return data.map(({ xp, ...rest }) => ({ ...rest, xp: Number(xp) }));
  } catch (err) {
    console.log({ err });

    if (err instanceof BaseError) {
      const revertError = err.walk(
        (err) => err instanceof ContractFunctionRevertedError
      );
      if (revertError instanceof ContractFunctionRevertedError) {
        const errorName = revertError.data?.errorName ?? "";
        // do something with `errorName`
        console.log({ errorName });
        throw new Error(errorName);
      }
    }
  }

  return [];
};

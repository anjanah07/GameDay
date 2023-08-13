// GameEngine deployed to 0x5FbDB2315678afecb367f032d93F642f64180aa3
import { publicClient } from "./config";
import { GameEngine__factory } from "../typechain-types/factories/contracts/GameEngine__factory";
import {
  BaseError,
  ContractFunctionRevertedError,
  createWalletClient,
  custom,
} from "viem";
import { localhost } from "viem/chains";

// 0x5FbDB2315678afecb367f032d93F642f64180aa3 - GameEngine Hardhat
export const startGame = async () => {
  console.log("startGame");

  const walletClient = createWalletClient({
    chain: { ...localhost, id: 31337 },
    transport: custom((window as any).ethereum),
  });

  const [account] = await walletClient.getAddresses();
  const { request } = await publicClient.simulateContract({
    address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    abi: GameEngine__factory.abi,
    functionName: "startGame",
    args: [1],
    account,
  });

  const hash = await walletClient.writeContract(request);

  const tx = await publicClient.waitForTransactionReceipt({ hash });

  console.log({ tx, hash });

  return tx;
};

export const endGame = async () => {
  console.log("endGame");

  const walletClient = createWalletClient({
    chain: { ...localhost, id: 31337 },
    transport: custom((window as any).ethereum),
  });

  const [account] = await walletClient.getAddresses();
  const { request } = await publicClient.simulateContract({
    address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    abi: GameEngine__factory.abi,
    functionName: "endGame",
    account,
  });

  const hash = await walletClient.writeContract(request);

  const tx = await publicClient.waitForTransactionReceipt({ hash });

  console.log({ tx, hash });

  return tx;
};

export const getUsers = async () => {
  try {
    console.log("getUsers");

    const data = await publicClient.readContract({
      address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
      abi: GameEngine__factory.abi,
      functionName: "getUsers",
    });

    console.log({ data });

    return data;
    data.map(({ xp, ...rest }) => ({ ...rest, xp: Number(xp) }));
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

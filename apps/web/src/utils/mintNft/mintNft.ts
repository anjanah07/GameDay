import { publicClient } from "@/client/client";
import abi from "@/contract-instance/abi/abi";
import { address } from "@/contract-instance/viem/contract-instance";
import {
  BaseError,
  ContractFunctionRevertedError,
  createWalletClient,
  custom,
} from "viem";
import { sepolia } from "wagmi";

export const mintNft = async (walletAddress: `0x${string}`) => {
  try {
    const walletClient = createWalletClient({
      chain: sepolia,
      transport: custom((window as any).ethereum),
    });
    const [account] = await walletClient.getAddresses();

    if (!account) return console.log("No Account found.....");

    const { request } = await publicClient.simulateContract({
      account,
      address,
      abi,
      functionName: "safeMint",
      args: [walletAddress],
    });

    if (!walletClient) return;

    const hash = await walletClient?.writeContract(request);
    console.log("hash,,,,,,,,", { hash });

    const receipt = await publicClient.waitForTransactionReceipt({ hash });
    console.log("receipt", receipt.transactionHash);

    return receipt;
  } catch (err) {
    if (err instanceof BaseError) {
      const revertError = err.walk(
        (err) => err instanceof ContractFunctionRevertedError
      );
      if (revertError instanceof ContractFunctionRevertedError) {
        const errorName = revertError.data?.errorName ?? "";
        // do something with `errorName`
        console.log({ customErr: errorName });
      }
    }
    console.log({ err });
    throw new Error((err as any).message);
  }
};

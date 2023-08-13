// import { publicClient } from "./config";

// import {
//   zoraCreator1155FactoryImplABI,
//   zoraCreator1155FactoryImplAddress,
// } from "@zoralabs/zora-1155-contracts";

// import dotenv from "dotenv";
// import {
//   BaseError,
//   ContractFunctionRevertedError,
//   createWalletClient,
//   custom,
//   decodeErrorResult,
// } from "viem";
// import { zoraTestnet } from "viem/chains";

// dotenv.config();

// export const getBalance = async () => {
//   console.log({ PRIV_KEY: process.env.NEXT_PUBLIC_PRIVATE_KEY });

//   const balance = await publicClient.getBalance({
//     address: "0xA0Cf798816D4b9b9866b5330EEa46a18382f251e",
//   });
//   return balance;
// };

// export const deploy721Contract = async () => {
//   const walletClient = createWalletClient({
//     chain: zoraTestnet,
//     transport: custom((window as any)?.ethereum),
//   });

//   // try {
//   const { request } = await publicClient.simulateContract({
//     address: zoraCreator1155FactoryImplAddress[999], //FACTORY_PROXY ERC1155
//     abi: zoraCreator1155FactoryImplABI,
//     functionName: "createContract",
//     args: [
//       "https://ipfs.io/ipfs/QmSknFJz1Z16xKGBJPF41DPsCzyzCYqBD8ZmVmnyaN1Vw4/{id}",
//       "MyFirstZoraNFT",
//       {
//         royaltyMintSchedule: 1,
//         royaltyBPS: 1,
//         royaltyRecipient: "0xA6D6923dF83266c132122A6Cd7875De8C07452fB",
//       },
//       "0xA6D6923dF83266c132122A6Cd7875De8C07452fB",
//       [],
//     ],
//   });
//   // } catch (err) {
//   //   if (err instanceof BaseError) {
//   //     const revertError = err.walk(
//   //       (err) => err instanceof ContractFunctionRevertedError
//   //     );
//   //     if (revertError instanceof ContractFunctionRevertedError) {
//   //       const errorName = revertError.data?.errorName ?? "";

//   //       // do something with `errorName`
//   //       console.log({ errorName, revertError });
//   //     }
//   //   }
//   // }

//   console.log({ walletClient });

//   // const hash = await walletClient.writeContract(request);
//   // const tx = await publicClient.waitForTransactionReceipt({ hash });

//   // console.log({ tx });

//   // return tx;
// };

import { createPublicClient, custom, http } from "viem";
import { createWalletClient } from "viem";
import { zoraTestnet } from "viem/chains";
import { privateKeyToAccount } from "viem/accounts";

export const publicClient = createPublicClient({
  chain: zoraTestnet,
  transport: http("https://testnet.rpc.zora.energy"),
});

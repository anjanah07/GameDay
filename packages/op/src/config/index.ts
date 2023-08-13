import { createPublicClient, custom, http } from "viem";
import {
  localhost,
  zoraTestnet,
  baseGoerli,
  optimismGoerli,
} from "viem/chains";

export const publicClient = createPublicClient({
  chain: { ...localhost, id: 31337 },
  // transport: http("https://testnet.rpc.zora.energy"),
  transport: http(),
});


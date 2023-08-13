import { createPublicClient, custom, http } from "viem";
import { localhost } from "viem/chains";

export const publicClient = createPublicClient({
  chain: { ...localhost, id: 31337 },
  // transport: http("https://testnet.rpc.zora.energy"),
  transport: http(),
});

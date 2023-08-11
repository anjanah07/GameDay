import { http, createPublicClient } from "viem";
import { sepolia } from "viem/chains";

export const publicClient = createPublicClient({
  chain: sepolia,
  transport: http(
    "https://eth-sepolia.g.alchemy.com/v2/bkJtZNQCZWbNUNJ39o5--lIismnFMM4i"
  ),
});

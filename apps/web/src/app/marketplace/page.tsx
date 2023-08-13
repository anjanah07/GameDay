"use client";

import React from "react";

// Wagmi
import { useAccount } from "wagmi";

// Components
import Button from "@/components/common/Button";

// Helpers
import { mintNft } from "@/utils/mintNft/mintNft";
import { useHashAtom } from "@/atoms/hash.atom";
import Image from "next/image";

type pageProps = {};

const Marketplace: React.FC<pageProps> = () => {
  const [hash, setHash] = useHashAtom();
  const { address } = useAccount();
  // Handlers
  const handleMint = async () => {
    const receipt = await mintNft(address as `0x${string}`);

    setHash(receipt?.transactionHash || "");
    console.log("transition hash", receipt?.transactionHash || "");
  };

  return (
    <section className="p-10">
      <div className="py-8 px-4 grid md:grid-cols-3 grid-cols-1 gap-8 place-items-center">
        {/* <Card onClick={handleMint} /> */}

        <div className="border border-white aspect-square flex flex-col justify-between">
          <div>
            <Image
              src="https://ipfs.io/ipfs/QmPeToagrXLYBZ8sBXehneFr4BAmyatJMFaSPXV6X3UP7v/1.gif"
              width={889}
              height={500}
              alt="cars"
            />
            <div>Price: 0.02 ETH</div>
          </div>

          <div className="bg-blue-500 rounded-lg px-4 py-2 text-center">
            Buy Now
          </div>
        </div>
        <div className="border border-white aspect-square flex flex-col justify-between">
          <div>
            <Image
              src="https://ipfs.io/ipfs/QmPeToagrXLYBZ8sBXehneFr4BAmyatJMFaSPXV6X3UP7v/2.gif"
              width={800}
              height={600}
              alt="cars"
            />
            <div>Price: 0.03 ETH</div>
          </div>
          <div className="bg-blue-500 rounded-lg px-4 py-2 text-center">
            Buy Now
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(Marketplace);

interface CardProps {
  onClick: () => void;
}

const Card: React.FC<CardProps> = ({ onClick }) => (
  <div className="h-64 dark:border-heading border border-custom-2 w-full rounded-lg p-2 flex items-center justify-start flex-col">
    card
    <Button onClick={onClick} text="Mint" className="w-64" />
  </div>
);

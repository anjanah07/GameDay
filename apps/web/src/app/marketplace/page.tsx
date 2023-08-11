"use client";

import React from "react";

// Wagmi
import { useAccount } from "wagmi";

// Components
import Button from "@/components/common/Button";

// Helpers
import { mintNft } from "@/utils/mintNft/mintNft";
import { useHashAtom } from "@/atoms/hash.atom";

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
      <div className="py-8 px-4 grid md:grid-cols-3 grid-cols-1 gap-4 place-items-center">
        Hash:{hash}
        <Card onClick={handleMint} />
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

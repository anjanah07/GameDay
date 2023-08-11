import React, { useEffect } from "react";
import { useWaitForTransaction } from "wagmi";

type Props = {
  hash: `0x${string}`;
};

const TxLoading = ({ hash }: Props) => {
  const { data, isError, isLoading, error } = useWaitForTransaction({
    hash,
  });

  useEffect(() => {
    console.log({ data });
  }, [data]);

  return (
    <div className="bg-red-500">
      TxLoading
      {isLoading && "Loading..."}
      {isError && JSON.stringify(error)}
    </div>
  );
};

export default TxLoading;

import { cn } from "@/utils/helpers";
import { getUsers } from "op";
import React, { useEffect, useState } from "react";
import { useAccount, useEnsName } from "wagmi";

type TableProps = {};

const Table: React.FC<TableProps> = () => {
  const TableHeading = ["Rank #", "ENS", "Address", "XP"];
  const { address, isConnecting, isDisconnected } = useAccount();

  const [users, setUsers] = useState<Awaited<ReturnType<typeof getUsers>>>([]);
  useEffect(() => {
    (async () => {
      const _users = await getUsers();
      console.log({ _users });

      setUsers(_users);
    })();
  }, []);

  return (
    <div className="mt-4 mx-auto  text-center">
      <Thead headingArr={TableHeading} />
      {[...users]
        .sort((a, b) => (a.xp < b.xp ? 1 : -1))
        .filter(({ isOwner, xp }) => !isOwner && xp)
        .map(({ userAddress, xp }, i) => (
          <TBody
            DataArr={[
              `${userAddress.slice(0, 4)}...${userAddress.slice(-4)}`,
              xp.toString(),
            ]}
            key={i}
            index={i}
            isYou={userAddress === address}
          />
        ))}
    </div>
  );
};
export default Table;

interface Props {
  headingArr: string[];
}

const Thead: React.FC<Props> = ({ headingArr }) => (
  <div className="border dark:border-heading border-custom-2 mt-5 font-bold flex items-center">
    {headingArr.map((heading) => (
      <div
        className="md:p-4 p-2  border-l dark:border-heading border-custom-2 flex items-center justify-center w-1/2 text-xs md:text-base"
        key={heading}
      >
        {heading}
      </div>
    ))}
  </div>
);

interface TBodyProps {
  index: number;
  isYou?: boolean;
  DataArr: string[];
}

const TBody: React.FC<TBodyProps> = ({ index, DataArr, isYou }) => {
  const { data } = useEnsName({ address: DataArr[0] as `0x${string}` });

  return (
    <div className="border dark:border-heading border-custom-2 flex items-center">
      <div
        className={cn(
          "md:p-4 p-2 border-l dark:border-heading border-custom-2 flex items-center justify-center w-1/2 text-xs md:text-base",
          isYou && "dark:bg-white/10 bg-black/10"
        )}
      >
        {index + 1}
      </div>
      <div
        className={cn(
          "md:p-4 p-2 border-l dark:border-heading border-custom-2 flex items-center justify-center w-1/2 text-xs md:text-base",
          isYou && "dark:bg-white/10 bg-black/10"
        )}
      >
        {data || "-"}
      </div>
      {DataArr.map((data) => (
        <div
          className={cn(
            "md:p-4 p-2 border-l dark:border-heading border-custom-2 flex items-center justify-center w-1/2 text-xs md:text-base",
            isYou && "dark:bg-white/10 bg-black/10"
          )}
          key={data}
        >
          {data}
        </div>
      ))}
    </div>
  );
};

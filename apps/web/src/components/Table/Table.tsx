import { cn } from "@/utils/helpers";
import React from "react";

type TableProps = {};

const Table: React.FC<TableProps> = () => {
  const TableHeading = [
    "Position",
    "Name",
    "Boost",
    "Loyalty",
    "Bid pts",
    "Lending Pts",
    "total",
  ];

  const DataArr = [
    "1",
    "Harsh",
    "Boost",
    "Loyalty",
    "Bid pts",
    "Lending Pts",
    "total",
  ];

  return (
    <div className="mt-4 mx-auto  text-center">
      <Thead headingArr={TableHeading} />
      {Array.from({ length: 100 }).map((_, i) => (
        <TBody DataArr={DataArr} key={i} isYou={i === 0} />
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
  isYou?: boolean;
  DataArr: string[];
}

const TBody: React.FC<TBodyProps> = ({ DataArr, isYou }) => (
  <div className="border dark:border-heading border-custom-2 flex items-center">
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

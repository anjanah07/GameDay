import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const SliceAddress = (add: string) =>
  `${add.slice(0, 4)}...${add.slice(-4)}`;

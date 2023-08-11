import { emptyBoard } from "@/constants";
import { atom, useAtomValue } from "jotai";
import { z } from "zod";

const BoardSchema = z.array(z.array(z.number()));

export type TBoard = z.infer<typeof BoardSchema>;

const boardAtom = atom<TBoard>(emptyBoard);

export const useBoardAtomValue = () => useAtomValue(boardAtom);

import { atom, useAtom, useAtomValue } from "jotai";
import { z } from "zod";

const PlayerSchema = z.object({
  direction: z.enum(["top", "bottom", "left", "right"]),
  x: z.number(),
  y: z.number(),
});

export type TPlayer = z.infer<typeof PlayerSchema>;

const playerAtom = atom<TPlayer>({
  direction: "right",
  x: 1,
  y: 1,
});

export const usePlayerAtomValue = () => useAtomValue(playerAtom);
export const usePlayerAtom = () => useAtom(playerAtom);

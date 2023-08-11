import { atom, useAtom, useAtomValue } from "jotai";
import { z } from "zod";
const HashSchema = z.string();

export type THash = z.infer<typeof HashSchema>;

const hashAtom = atom<THash>("");

export const useHashAtomValue = () => useAtomValue(hashAtom);

export const useHashAtom = () => useAtom(hashAtom);

//For set the Atom value => useSetAtom()
//To get the Atom value => useAtomValue()
//To get & set the Atom value => useAtom()

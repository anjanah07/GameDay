import { cn } from "@/utils/helpers";
import { signIn, useSession } from "next-auth/react";
import React from "react";

type Props = {};

const GlassGate = (props: Props) => {
  const { data: session, status } = useSession();

  return (
    <div
      className={cn(
        "font-proto grid place-items-center bg-slate-800/70 backdrop-blur-md fixed inset-0 z-30 transition-all ease-in-out delay-150 duration-600",
        !!session && "-translate-y-full"
      )}
    >
      <div className="text-center">
        <div className="text-heading text-6xl font-semibold">
          Game Day 1.0 👾
        </div>
        <button
          className="bg-purple-900 border-2 border-black py-2 px-4 rounded-lg my-4"
          onClick={() => signIn()}
        >
          Sign In with Worldcoin 🌍
        </button>
      </div>
    </div>
  );
};

export default GlassGate;

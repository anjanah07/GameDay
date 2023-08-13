"use client";
import Cars from "@/components/Cars/Cars";
import MazeGrid from "@/components/Pacman/MazeGrid";
import { cn } from "@/utils/helpers";
import { TChainClient, endGame, getUsers, startGame } from "op";
import React, { useEffect, useState } from "react";
import { useNetwork } from "wagmi";
const games = {
  pacman: <MazeGrid />,
  cars: <Cars />,
} as const;

type TGameState = "idle" | "ongoing";

const PageId = ({ params }: { params: { id: keyof typeof games } }) => {
  const { chain } = useNetwork();

  const [users, setUsers] = useState<Awaited<ReturnType<typeof getUsers>>>([]);
  const [gameState, setGameState] = useState<TGameState>("idle");
  useEffect(() => {
    (async () => {
      const _users = await getUsers(chain?.network as TChainClient);
      console.log({ _users });

      setUsers(_users);
    })();
  }, [gameState]);

  useEffect(() => {
    console.log({ chain });
  }, [chain]);

  return (
    <section className="dark:text-text text-black px-10 py-6 flex items-center w-full flex-col">
      <h1 className="text-heading text-5xl font-bold mb-10">{params.id}</h1>
      <div className="flex items-center w-full gap-4 h-[41rem]">
        {/* Todo: Add the Games PLayGround */}
        <div className="w-[80%] h-full flex justify-center border dark:border-heading border-custom-2 rounded-lg">
          {games[params.id]}
        </div>

        <div className="w-[50%] h-full rounded-lg p-2">
          <div>
            <h1 className="text-heading text-xl font-semibold mb-1">
              Game State
            </h1>
            <div>{gameState.toUpperCase()}</div>
            <h1 className="text-heading text-xl font-semibold mb-1 mt-10">
              Chain
            </h1>
            <div>{chain?.name}</div>
          </div>
          <div className="mt-10">
            <h1 className="text-heading text-xl font-semibold mb-1">Actions</h1>
            <div className="flex gap-2">
              <button
                disabled={gameState === "ongoing"}
                className={cn(
                  "bg-zinc-800 py-2 px-4 rounded-lg",
                  gameState === "ongoing" && "opacity-50"
                )}
                onClick={async () => {
                  try {
                    await startGame(chain?.network as TChainClient);
                    setGameState("ongoing");
                  } catch (error) {
                    console.error(error);
                  }
                }}
              >
                Start Game
              </button>
              <button
                disabled={gameState === "idle"}
                className={cn(
                  "bg-zinc-800 py-2 px-4 rounded-lg",
                  gameState === "idle" && "opacity-50"
                )}
                onClick={async () => {
                  try {
                    await endGame(chain?.network as TChainClient);
                    setGameState("idle");
                  } catch (error) {
                    console.error(error);
                  }
                }}
              >
                End Game
              </button>
              <button
                className="bg-zinc-800 py-2 px-4 rounded-lg"
                onClick={() => getUsers(chain?.network as TChainClient)}
              >
                Get Users
              </button>
            </div>
          </div>

          <div className="mt-10">
            <h1 className="text-heading text-xl font-semibold mb-1">
              Leaderboard
            </h1>

            {[...users]
              .sort((a, b) => (a.xp < b.xp ? 1 : -1))
              .filter(({ isOwner, xp }) => !isOwner && xp)
              .map(({ userAddress, xp }, i) => (
                <AboutGameStrip
                  AboutGameStripData={[
                    { title: "Rank", desc: `#${i + 1}` },
                    { title: "address", desc: userAddress },
                    { title: "XP", desc: xp.toString() },
                  ]}
                />
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};
export default React.memo(PageId);

interface AboutGameStripProps {
  AboutGameStripData: {
    title: string;
    desc: string;
  }[];
  className?: string;
}

const AboutGameStrip: React.FC<AboutGameStripProps> = ({
  className,
  AboutGameStripData,
}) => (
  <div
    className={cn(
      "dark:border-heading border border-custom-2 p-2.5 rounded-lg flex items-center justify-between w-full",
      className
    )}
  >
    {AboutGameStripData &&
      AboutGameStripData.map(({ desc, title }) => (
        <div key={`about-game-${title}`}>
          <div className="text-base font-semibold text-heading">{title}</div>
          <div className="text-sm font-normal">{desc}</div>
        </div>
      ))}
  </div>
);

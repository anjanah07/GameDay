"use client";

import React, { useEffect, useState } from "react";

// Atom
import { useBoardAtomValue } from "@/atoms/board.atom";
import { usePlayerAtom } from "@/atoms/player.atom";

// Helpers
import { cn } from "@/utils/helpers";

type PLayerProps = {};

const Player = (props: PLayerProps) => {
  const [player, setPlayer] = usePlayerAtom();
  const [leftPercent, setLeftPercent] = useState(0);
  const [topPercent, setTopPercent] = useState(0);
  const board = useBoardAtomValue();

  const dirDeg: { [key in typeof player.direction]: string } = {
    top: "-rotate-90",
    bottom: "rotate-90",
    left: "-rotate-180",
    right: "",
  };

  function checkCollision(
    x: number,
    y: number,
    direction: typeof player.direction
  ) {
    let value = null;

    if (direction === "right") value = board[y][x + 1];
    if (direction === "left") value = board[y][x - 1];
    if (direction === "bottom") value = board[y + 1][x];
    if (direction === "top") value = board[y - 1][x];
    return value;
  }

  useEffect(() => {
    const directions: { [key: string]: typeof player.direction } = {
      ArrowUp: "top",
      ArrowDown: "bottom",
      ArrowLeft: "left",
      ArrowRight: "right",
    };

    const listener = (e: KeyboardEvent) => {
      if (directions[e.key]) {
        setPlayer((prev) => ({
          ...prev,
          direction: directions[e.key],
        }));
      }
    };

    window.addEventListener("keydown", listener);

    // window.addEventListener("blur", () => console.log("out of focus"));
    // window.addEventListener("focus", () => console.log("in focus"));

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const { x, y, direction } = player;

      //   let collisionVal = checkCollision(player.x, player.y, player.direction);
      //   if (collisionVal !== 1) {
      //     if (direction === "right" && x < 27) {
      //       //   x += 1;
      //       setPlayer((prev) => ({ ...prev, x: prev.x + 1 }));
      //     }
      //     if (direction === "left" && x > 0) {
      //       //   x -= 1;
      //       setPlayer((prev) => ({ ...prev, x: prev.x - 1 }));
      //     }
      //     if (direction === "bottom" && y < 30) {
      //       //   y += 1;
      //       setPlayer((prev) => ({ ...prev, y: prev.y + 1 }));
      //     }
      //     if (direction === "top" && y > 0) {
      //       //   y -= 1;
      //       setPlayer((prev) => ({ ...prev, y: prev.y - 1 }));
      //     }
      //   }

      setLeftPercent((prev) => (player.x * 100) / 28);
      //   setTopPercent((prev) => (player.y * 100) / 31);
      // setPlayer((prev) => ({ ...prev, x: prev.x + 1 }));
    }, 1000);

    return () => clearInterval(interval);
  }, [player.x, player.direction]);

  return (
    <>
      {/* LeftPercent: {leftPercent} */}
      <img
        src="/pacman.gif"
        className={cn(
          "absolute top-6 h-5 w-5 transform transition-all",
          dirDeg[player.direction]
        )}
        style={{
          left: `calc(24px + ${leftPercent}%)`,
          top: `calc(24px + ${topPercent}%)`,
        }}
      />
    </>
  );
};

export default Player;

"use client";

import React from "react";

// Assets
import Maze from "@/assets/maze";
import MazeLowOpacity from "@/assets/mazeLowOpacity";

// Atom
import { useBoardAtomValue } from "@/atoms/board.atom";

// Assets
import { cn } from "@/utils/helpers";

// Components
import Player from "./Player/Player";

function Square(square: number[]) {
  let classVal = "square";
  const common = "h-5 w-5 inline-block";

  const squares = square.map((item, i) => {
    if (item === 0) classVal = "h-5 w-5";
    if (item === 1) classVal = "bg-transparent";
    if (item === 2)
      classVal = "h-[5px] w-[5px] rounded-full bg-yellow-200 mx-[7.5px]";
    // if (item === 0) classVal = "square";
    // if (item === 1) classVal = "square wall";
    // if (item === 2) classVal = "square dot";

    return <span key={i} className={cn(common, classVal)} />;
  });
  return squares;
}

const MazeGrid = () => {
  const board = useBoardAtomValue();

  const rows = board.map((row, i) => {
    return <div className="leading-[0px]">{Square(row)}</div>;
  });

  return (
    <div className="relative  h-fit">
      <div className="absolute w-[560px] h-fit top-0">{rows}</div>
      <Player />
      <Maze />
      <MazeLowOpacity className="absolute top-2" />
    </div>
  );
};

export default MazeGrid;

import Cars from "@/components/Cars/Cars";
import MazeGrid from "@/components/Pacman/MazeGrid";
import { cn } from "@/utils/helpers";
import React from "react";
const games = {
  pacman: <MazeGrid />,
  cars: <Cars />,
} as const;
const PageId = ({ params }: { params: { id: keyof typeof games } }) => {
  return (
    <section className="dark:text-text text-black px-10 py-6 flex items-center w-full flex-col">
      <h1 className="text-heading text-5xl font-bold mb-10">{params.id}</h1>
      <div className="flex items-center w-full gap-4 h-[41rem]">
        {/* Todo: Add the Games PLayGround */}
        <div className="w-[80%] h-full flex justify-center border dark:border-heading border-custom-2 rounded-lg">
          {games[params.id]}
        </div>

        <div className="w-[50%] h-full rounded-lg p-2">
          <AboutGameStrip
            AboutGameStripData={[
              { title: "Price", desc: "5eth" },
              { title: "Last Bid", desc: "10eth" },
              { title: "Top Bid", desc: "10eth" },
              { title: "Rarity", desc: "rare" },
              { title: "Owner", desc: "harsh.eth" },
              { title: "id", desc: "111" },
            ]}
          />

          <div className="mt-10">
            <h3 className="text-heading text-xl font-semibold mb-1">Traits</h3>
            <div className="grid grid-cols-2 gap-5 place-items-center w-full">
              <AboutGameStrip
                AboutGameStripData={[
                  { title: "Background", desc: "Brown" },
                  { title: "Rarity", desc: "111.35%" },
                ]}
              />
              <AboutGameStrip
                AboutGameStripData={[
                  { title: "Clothes", desc: "Brown" },
                  { title: "Rarity", desc: "111.35%" },
                ]}
              />
              <AboutGameStrip
                AboutGameStripData={[
                  { title: "Eyes", desc: "Brown" },
                  { title: "Rarity", desc: "111.35%" },
                ]}
              />

              <AboutGameStrip
                AboutGameStripData={[
                  { title: "Specialty", desc: "Brown" },
                  { title: "Rarity", desc: "111.35%" },
                ]}
              />
              <AboutGameStrip
                AboutGameStripData={[
                  { title: "Version", desc: "Brown" },
                  { title: "Rarity", desc: "111.35%" },
                ]}
              />
            </div>
          </div>

          <div className="mt-10">
            <h1 className="text-heading text-xl font-semibold mb-1">
              Activities
            </h1>
            <AboutGameStrip
              AboutGameStripData={[
                { title: "Price", desc: "5eth" },
                { title: "Last Bid", desc: "10eth" },
                { title: "Top Bid", desc: "10eth" },
                { title: "Rarity", desc: "rare" },
                { title: "Owner", desc: "harsh.eth" },
                { title: "id", desc: "111" },
              ]}
            />
            <AboutGameStrip
              AboutGameStripData={[
                { title: "Price", desc: "5eth" },
                { title: "Last Bid", desc: "10eth" },
                { title: "Top Bid", desc: "10eth" },
                { title: "Rarity", desc: "rare" },
                { title: "Owner", desc: "harsh.eth" },
                { title: "id", desc: "111" },
              ]}
              className="my-4"
            />
            <AboutGameStrip
              AboutGameStripData={[
                { title: "Price", desc: "5eth" },
                { title: "Last Bid", desc: "10eth" },
                { title: "Top Bid", desc: "10eth" },
                { title: "Rarity", desc: "rare" },
                { title: "Owner", desc: "harsh.eth" },
                { title: "id", desc: "111" },
              ]}
            />
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

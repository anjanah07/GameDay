"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

type pageProps = {};

const Play: React.FC<pageProps> = () => {
  const { data: session, status } = useSession({ required: true });

  if (status === "loading") return <div>Loading...</div>;

  const { push } = useRouter();

  const TestData = [{ title: "Cars" }, { title: "Pacman" }, { title: "Chess" }];

  return (
    <section className="p-10 grid grid-cols-3 gap-4 place-items-center  h-full">
      {TestData.map(({ title }) => (
        <PLayStrip
          key={`play-${title}`}
          title={title}
          onClick={() => push(`/play/${title.toLowerCase()}`)}
        />
      ))}

      <div className="text-heading text-2xl font-semibold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        More Games Coming Soon!!
      </div>
    </section>
  );
};
export default Play;

interface PlayStripProps {
  title: string;
  onClick: () => void;
}

const PLayStrip: React.FC<PlayStripProps> = ({ title, onClick }) => (
  <button
    key={title}
    className="dark:text-text text-black cursor-pointer border dark:border-heading h-32 border-custom-2 w-full py-4 px-8 text-center rounded-lg text-xl font-semibold hover:dark:bg-text-hover hover:dark:text-black  transition-all duration-300 ease-in-out"
    onClick={onClick}
  >
    {title}
  </button>
);

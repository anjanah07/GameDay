"use client";

import React from "react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { ConnectButton } from "@rainbow-me/rainbowkit";

import { signIn, signOut, useSession } from "next-auth/react";

// Assets
import { Moon, Sun } from "@/assets/icons";

// Components
import { toast } from "react-hot-toast";

type NavbarProps = {};

const Navbar: React.FC<NavbarProps> = () => {
  const { data: session } = useSession();

  const { push } = useRouter();

  const { resolvedTheme: currentTheme, setTheme } = useTheme();

  // Data
  const NavbarData = [
    {
      title: "Play Games",
      route: "/play",
    },
    {
      title: "Marketplace",
      route: "/marketplace",
    },
  ];

  // Handlers
  const handleTheme = () => {
    setTheme(currentTheme === "dark" ? "light" : "dark");
    toast.success(
      `theme switched to ${
        currentTheme === "dark" ? "light" : "dark"
      } successfully!!`
    );
  };
  return (
    <header className="border-b dark:border-main-light border-gray-500 sticky top-0 z-10 backdrop-blur-md px-10 py-5 flex items-center justify-between">
      <div className="flex items-center gap-8">
        <h1
          className="text-heading uppercase font-semibold text-2xl cursor-pointer"
          role="presentation"
          onClick={() => push("/")}
        >
          Your Logo
        </h1>

        <div>
          <ul className="dark:text-text text-black flex items-center">
            {NavbarData.map(({ route, title }) => (
              <li
                key={`navbar-${title}`}
                className="text-base font-medium cursor-pointer first:ml-0 ml-4"
                onClick={() => push(route)}
              >
                {title}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <ConnectButton />

        {session && (
          <button
            className="bg-zinc-800 py-2 px-4 rounded-lg"
            onClick={() => signOut()}
          >
            Sign Out Of Worldcoin
          </button>
        )}

        <div
          role="presentation"
          onClick={handleTheme}
          className="cursor-pointer text-text"
        >
          {currentTheme === "dark" ? Sun : Moon}
        </div>
      </div>
    </header>
  );
};
export default React.memo(Navbar);

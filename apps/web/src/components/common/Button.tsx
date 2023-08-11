import React from "react";

// Utils
import { cn } from "@/utils/helpers";

type ButtonProps = {
  text: string;
  className?: string;
  onClick: () => void;
};

const Button: React.FC<ButtonProps> = ({ text, className, onClick }) => (
  <button
    type="button"
    className={cn(
      className,
      "border-none outline-none dark:bg-heading bg-custom-1 dark:text-black text-white  py-2 px-6 rounded-lg dark:hover:bg-heading/80 transition-all duration-300 ease-in-out hover:bg-custom-1/80"
    )}
    onClick={onClick}
  >
    {text}
  </button>
);
export default React.memo(Button);

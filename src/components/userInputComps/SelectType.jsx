import React from "react";
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import {  motion } from "framer-motion";

const SelectType = ({
  options,
  isSelected,
  isCorrect,
  onSelect,
  disabled,
  ...props
}) => {
  const handleClick = () => {
    if (onSelect) {
      onSelect(options); // Notify parent about selection
    }
  };

  return (
    <button
      {...props}
      onClick={handleClick}
      disabled={disabled}
      className={`w-full flex items-center justify-between px-4 py-2 
         rounded-b-[2.5vw] md:rounded-b-[1vw] lg:rounded-b-[1vw] lg:rounded-t-[0.2vw] border-[1px]
          lg:w-[80%] 
        ${
          isSelected
            ? isCorrect
              ? "border-[#00ff2a83] " // Green if correct
              : "border-red-500 " // Red if incorrect
            : " border-[#798ace96]"
        }
      `}
    >
      <motion.p
    key={options} // Ensures animation runs when options change
    className="text-sm font-bold"
    initial={{ opacity: 0, x: -10 }} // Start slightly left
    animate={{ opacity: 1, x: 0 }} // Animate to visible state
    exit={{ opacity: 0, x: 10 }} // Move slightly right on exit
    transition={{ duration: 0.3, ease: "easeInOut" }} // Smooth transition
  >
    {options}
  </motion.p>
      <div
        className={`relative p-2 rounded-full flex items-center justify-center border-[1px] border-[#798ace96] text-sm 
        ${
          isSelected
            ? isCorrect
              ? "bg-[#58ff7491] border-[#58ff7491]"
              : "bg-red-400 border-2red-400"
            : ""
        }
      `}
      >
        {isSelected ? (
          isCorrect ? (
            <FaCheck className="absolute lg:text-[1vw] left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 " />
          ) : (
            <RxCross2 className="absolute lg:text-[1vw] left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 " />
          )
        ) : (
          ""
        )}
      </div>
    </button>
  );
};

export default SelectType;

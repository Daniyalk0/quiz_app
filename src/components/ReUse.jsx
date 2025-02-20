import React from "react";
import bgImage from "../../public/btnImage.jpeg";
import { motion, AnimatePresence } from "framer-motion";

const ReUse = ({ question, text, score }) => {
  return (
    <div
    style={{ backgroundImage: `url(${bgImage})` }}
    className="px-2 py-1 bg-zinc-500 w-fit rounded-md flex items-center justify-center gap-2 relative"
  >
    {/* Background Blur Overlay */}
    <div className="w-full h-full absolute bg-[#00ff0858] blur-xs" />
  
    {/* Question Transition */}
    <AnimatePresence mode="wait">
      {question !== undefined && (
        <motion.h2
          key={question} // Unique key triggers animation
          className="relative font-bold"
          initial={{ opacity: 0, y: 10 }} // Start below
          animate={{ opacity: 1, y: 0 }} // Fade in & move up
          exit={{ opacity: 0, y: -10 }} // Fade out & move up
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {question}
        </motion.h2>
      )}
    </AnimatePresence>
  
    {/* Text Transition */}
    <AnimatePresence mode="wait">
      <motion.h2
        key={text} // Unique key triggers animation
        className="relative font-bold"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {text}
      </motion.h2>
    </AnimatePresence>
  
    {/* Score Transition */}
    <AnimatePresence mode="wait">
      {score !== undefined && (
        <motion.h2
          key={score} // Unique key triggers animation
          className="relative font-bold"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {score}/10
        </motion.h2>
      )}
    </AnimatePresence>
  </div>
  );
};

export default ReUse;

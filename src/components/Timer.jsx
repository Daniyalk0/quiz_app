import React, { useEffect, useState } from "react";

const Timer = ({onReset, setIsTimeOver, onTimeUp}) => {
  const [seconds, setSeconds] = useState(10);

    useEffect(() => {
      if (seconds <= 0) {
        onTimeUp(); // Notify parent to change the question
        return;
      }

    const timer = setTimeout(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer); // Cleanup on unmount
  }, [seconds]);

  const resetTimer = () => {
    setSeconds(10);
  };

  // Pass reset function to parent
  useEffect(() => {
    if (onReset) {
      onReset(() => resetTimer);
    }
  }, [onReset]);

  return (
    <div className="px-6 py-6 rounded-full text-3xl bg-[#00ffa6] flex items-center justify-center w-fit relative">
      <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-zinc-800 font-bold">
        {seconds}
      </p>
    </div>
  );
};

export default Timer;

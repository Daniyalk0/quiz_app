import React, { useEffect, useState } from "react";
import { loadAttempts, clearAttempts } from "./indexed.db/IndexDB";

const AttemptHistory = ({ ResetQuiz, quizCompleted }) => {
  const [attempts, setAttempts] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0); // Key to trigger re-fetch

  // Fetch attempts from IndexedDB whenever quiz completion or refreshKey changes
  useEffect(() => {
    const fetchAttempts = async () => {
      const data = await loadAttempts();
      setAttempts(data);
    };
    fetchAttempts();
  }, [quizCompleted, refreshKey]); // Depend on refreshKey to force updates

  // Reset History Function
  const handleResetHistory = async () => {
    await clearAttempts(); // Clear attempts from IndexedDB
    setAttempts([]); // Reset local state
    setRefreshKey((prev) => prev + 1); // Force re-fetch
  };

  return (
    <div className="flex w-full justify-center items-center flex-col text-white">
      <h1 className="text-center bg-[#2dc7ff09] p-4 rounded-t-2xl">Attempts Summary</h1>

      <div className="w-[90%] max-h-[100vw] lg:max-h-[40vw] xl:max-h-[30vw] overflow-y-auto px-3 xl:px-9 lg:py-10 py-5 md:w-[50%] lg:w-[45%] bg-[#2dc7ff09] rounded-[5vw] md:rounded-[2vw] relative flex flex-col-reverse gap-5">
        {attempts.length > 0 ? (
          attempts.map(({ attemptNumber, score, timestamp }) => {
            const date = new Date(timestamp).toLocaleDateString();
            const time = new Date(timestamp).toLocaleTimeString(undefined, {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            });

            return (
              <div key={attemptNumber} className="w-full flex flex-col items-center justify-center text-xs md:text-sm">
                <div className="w-full flex items-center justify-between text-zinc-100 bg-[#0000004e] px-3 py-1 rounded-md">
                  <p>Attempt: {attemptNumber}</p>
                  <p>Score: {score}/10</p>
                  <p>Date: {date}</p>
                  <p>Time: {time}</p>
                </div>
                <div className="w-full h-[1px] bg-[#798ace96] my-4"></div>
              </div>
            );
          })
        ) : (
          <p className="text-center text-gray-400">No attempts recorded yet.</p>
        )}
      </div>

      <div className="flex w-full items-center justify-center gap-5">
        <button
          onClick={ResetQuiz}
          className="text-center outline-none transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-[#2dc7ff2e] hover:bg-[#2dc7ff19] bg-[#2dc7ff09] p-4 rounded-2xl my-5 border border-[#ffffff40]"
        >
          Re-Start Quiz
        </button>
        <button
          onClick={handleResetHistory}
          className="text-center outline-none transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-[#2dc7ff2e] hover:bg-[#2dc7ff19] bg-[#2dc7ff09] p-4 rounded-2xl my-5 border border-[#ffffff40]"
        >
          Reset History
        </button>
      </div>
    </div>
  );
};

export default AttemptHistory;

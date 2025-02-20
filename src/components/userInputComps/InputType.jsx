import React from "react";

const InputType = ({ userInput, setUserInput, disabled }) => {
  return (
    <div className="w-[50%] flex items-center justify-between px-0 py-2 bg-transparent rounded-[5vw] lg:w-[40%]">
      <input
        type="number"
        value={userInput} // Controlled input
        onChange={(e) => setUserInput(e.target.value)}
        className="px-2 py-1 w-full border-b-[1px] outline-none border-blue-500"
        placeholder="Your answer.."
        disabled={disabled} // Disable after user submits answer
      />
    </div>
  );
};

export default InputType;


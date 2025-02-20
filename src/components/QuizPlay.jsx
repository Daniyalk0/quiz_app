import React, { useEffect, useState } from "react";
import Timer from "./Timer";
import quizData from "../data/quizData";
import SelectType from "./userInputComps/SelectType";
import ReUse from "./ReUse";
import InputType from "./userInputComps/InputType";
import bgImage from '../../public/btnImage.jpeg'
import { motion } from "framer-motion";
import {
  loadAttempts,
  saveAttempt,
} from "./indexed.db/IndexDB";
import AttemptHistory from "./AttemptHistory";

const QuizPlay = () => {
 // State to hold quiz data (questions & answers)
const [Data, setData] = useState(quizData);

// State to track the current question index
const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

// State to store the user's selected answer
const [userAnswer, setUserAnswer] = useState(null);

// Get the correct answer for the current question
const correctAnswer = Data[currentQuestionIndex]?.answer;

// State to reset the timer (if applicable)
const [resetTimer, setResetTimer] = useState(null);

// State to store the user's score
const [score, setScore] = useState(null);

// State to store user input when they type an answer (for text input-based questions)
const [userInput, setUserInput] = useState("");

// State to track if the user hovers over the submit button
const [isMouseEnterSubmit, setIsMouseEnterSubmit] = useState(false);

// State to track if the quiz is completed
const [quizCompleted, setQuizCompleted] = useState(false);

/**
 * Handles quiz completion: saves the attempt and toggles the completion state.
 */
const handleQuizCompletion = async () => {
  const previousAttempts = await loadAttempts(); // Load previous attempts from storage
  const newAttemptNumber = previousAttempts.length + 1; // Calculate the new attempt number

  // Save the new attempt with the score and timestamp
  await saveAttempt({
    attemptNumber: newAttemptNumber,
    score,
    date: new Date().toLocaleString(),
  });

  console.log(`🎉 Attempt ${newAttemptNumber} saved with score: ${score}`);

  setQuizCompleted((prev) => !prev); // Toggle state to trigger useEffect
};

/**
 * Runs when the current question index changes.
 * If the user reaches the last question, it triggers quiz completion.
 */
useEffect(() => {
  if (currentQuestionIndex >= Data?.length - 1) {
    handleQuizCompletion();
  }
}, [currentQuestionIndex]); // Runs whenever currentQuestionIndex updates

/**
 * Handles user's answer selection (for multiple-choice questions).
 * Checks if the selected option is correct and updates the score.
 */
const handleAnswer = (selectedOption) => {
  setUserAnswer(selectedOption);

  // If the selected option is correct, increase the score
  if (selectedOption === correctAnswer) {
    setScore((prev) => prev + 1);
  }

  // Move to the next question after a short delay
  setTimeout(nextQuestion, 800);
};

/**
 * Handles user answer input (for text-based questions).
 * Compares input with the correct answer and updates the score if correct.
 */
const handleAnswerInput = () => {
  setUserAnswer(userInput);

  // Compare user input with the correct answer (case-insensitive & trimmed)
  if (userInput.trim().toLowerCase() === correctAnswer.trim().toLowerCase()) {
    setScore((prev) => prev + 1);
    console.log('correcttttt');
  } else {
    console.log('incorrecttt');
  }

  // Clear the input and move to the next question after a short delay
  setTimeout(() => {
    setUserInput("");  // Clear input after 600ms
    nextQuestion();    // Move to the next question
  }, 600);
};

/**
 * Moves to the next question or finishes the quiz.
 * Resets the timer, clears user answer, and updates the question index.
 */
const nextQuestion = () => {
  if (currentQuestionIndex < Data.length - 1) {
    setCurrentQuestionIndex((prev) => prev + 1); // Move to the next question

    if (resetTimer) resetTimer(); // Reset timer if applicable

    setUserAnswer(null); // Clear previous answer

    console.log("geat");
  } else {
    // If it's the last question, show an alert and mark the quiz as finished
    alert(`Quiz finished! Your score: ${score}/${Data.length}`);
    handleQuizCompletion();
  }
};

// Check if the quiz is finished
const isQuizFinished = currentQuestionIndex >= Data.length - 1;

/**
 * Resets the quiz: sets the index back to 0, clears the score and answers.
 */
const restartQuiz = () => {
  setCurrentQuestionIndex(0);
  setScore(0);
  setUserAnswer(null);
};

  
  return (
    <div className="w-full p-0 text-white flex items-center justify-center flex-col relative">
      {!isQuizFinished ? (
      <div
        className={`bg-[#2dc7ff1f] px-5 xl:px-9 lg:py-10 py-5 rounded-b-[5vw] 
         md:rounded-b-[2vw] flex flex-col justify-start w-[90%] items-start gap-3 relative md:w-[50%] ${
          currentQuestionIndex >= 6 ? "pt-12" : "pt-9"
        }`}
      >
        <div className="w-full flex items-center justify-between">
          <ReUse
            question={`Question: ${currentQuestionIndex + 1}/${Data.length}`}
          />
          <ReUse text="score:" score={score} />
        </div>
        <div className="w-full flex justify-center absolute left-1/2 -translate-x-1/2 top-[-8%]">
          <Timer onReset={setResetTimer} onTimeUp={nextQuestion} />
        </div>


<motion.h1
  key={currentQuestionIndex} // Ensures animation runs when question changes
  className="question text-sm mt-4 lg:text-lg py-3"
  initial={{ opacity: 0, y: 10 }} // Start from below with opacity 0
  animate={{ opacity: 1, y: 0 }} // Animate to visible state
  exit={{ opacity: 0, y: -10 }} // Exit animation (optional)
  transition={{ duration: 0.3, ease: "easeInOut" }} // Smooth transition
>
  {currentQuestionIndex + 1}. {Data[currentQuestionIndex]?.question}
</motion.h1>

        {currentQuestionIndex <= 4 ? (
          <div className="w-full flex flex-col items-center justify-center gap-5">
            {Data[currentQuestionIndex]?.options?.map((option, index) => (
              <SelectType
                key={index}
                options={option}
                isSelected={userAnswer === option}
                isCorrect={option === correctAnswer} // Pass correct answer check
                onSelect={handleAnswer}
                disabled={userAnswer !== null}
              />
            ))}
          </div>
        ) : (
          <div className="w-full flex flex-col items-start justify-center gap-5">
            <InputType userInput={userInput} setUserInput={setUserInput} />
            <button
              onClick={handleAnswerInput}
              onMouseEnter={() => setIsMouseEnterSubmit(true)}
              onMouseLeave={() => setIsMouseEnterSubmit(false)}
              style={{ backgroundImage: `url(${bgImage})` }}
              className={`relative px-3 py-1 rounded-b-[2vw] md:rounded-b-[0.9vw] lg:rounded-b-[0.8vw] transition-all duration-200 ${
                userInput !== "" && userInput !== null
                  ? "brightness-[1.8] cursor-pointer"
                  : "brightness-[0.7] cursor-auto "
              }`}
            >
               <div className={`transition-all  blur-md duration-200 w-full h-full absolute  ${isMouseEnterSubmit && userInput !== "" && userInput !== null ? ' bg-[#00ff0858]' : 'bg-transparent'}`}/>

             <p className={`font-bold relative   btn ${
                userInput !== "" && userInput !== null
                  ? "text-black"
                  : "text-zinc-300"
              }`}>Submit</p>
            </button>
          </div>
        )} 
      </div>
      ) : (
      <AttemptHistory ResetQuiz={restartQuiz} quizCompleted={quizCompleted} />
      )}
    </div>
  );
};

export default QuizPlay;

import React, { useEffect, useState } from 'react'
import QuizPlay from './components/QuizPlay'
import { motion } from "framer-motion";
import AttemptHistory from './components/AttemptHistory';

const App = () => {
  const [element1, setElement1] = useState({ x: 0, y: 0 });
  const [element2, setElement2] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const moveShadow = () => {
      setElement1({
        x: (Math.random() - 0.5) * window.innerWidth * 1.2, // 1.2 extends movement outside viewport
        y: (Math.random() - 0.5) * window.innerHeight * 1.2,
        
      });
    };

    const interval = setInterval(moveShadow, 2000); // Move every 2 seconds
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    const moveShadow = () => {
      setElement2({
        x: Math.random() * window.innerWidth - window.innerWidth / 2,
        y: Math.random() * window.innerHeight - window.innerHeight / 2,
      });
    };

    const interval = setInterval(moveShadow, 2000); // Move every 2 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className='flex items-center justify-center w-full h-screen overflow-hidden relative'>
    <motion.div
        className="absolute w-64 h-64 bg-blue-500 blur-3xl opacity-50"
        animate={{ x: element1.x, y: element1.y }}
        transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
      />
    <motion.div
        className="absolute w-64 h-64 bg-blue-500 blur-3xl opacity-50"
        animate={{ x: -element1.x, y: -element1.y }}
        transition={{ duration: 2, ease: "easeInOut", repeat: Infinity  }}
      />

      <QuizPlay/>
    </div>
  )
}

export default App
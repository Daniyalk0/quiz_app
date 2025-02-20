import React from 'react'


const Btn = ({text, onClick, disabled}) => {
  return (
    <button onClick={onClick} className={` w-[50%] p-1  flex items-center justify-center ${text === 'Reset' ? 'rounded-bl-2xl' : "rounded-br-2xl"} ${disabled ? 'bg-zinc-500 text-zinc-400' : 'bg-green-700 text-zinc-100'}`} disabled={disabled}>
      
      {text}</button>
  )
}

export default Btn
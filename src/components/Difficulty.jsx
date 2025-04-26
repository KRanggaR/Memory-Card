import React from 'react'
import '../styles/difficulty.css'

export default function Difficulty({text, getDifficulty}) {
  return (
    <div className='difficulty-level-box'>
      <button className="difficulty-level-button" onClick={getDifficulty}>{text}</button>
    </div>
  )
}

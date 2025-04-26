import React from 'react'
import '../styles/endgame.css'

export default function EndGame({score :{currentScore}}) {

  return (
    <>
     <div className='end-game-container'>
        <div className="end-game-box">
            <h2>You Lost</h2>
            <img className='end-game-image' src="/assets/sad.png" alt="" />
            <p>Score : {currentScore}</p>
            <button className='end-game-button'>Play Again?</button>
        </div>
    </div> 
    </>
  )
}

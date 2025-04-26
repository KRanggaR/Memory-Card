import React from 'react'
import '../styles/endgame.css'

export default function EndGame({ state: { currentScore, gameEnded, pokemons }, resetGame }) {

  return (
    <>
      
        {
        gameEnded &&
        (
        <div className='end-game-container'>
          <div className="end-game-box">
            <h2>{currentScore===pokemons.length? "You Won":"You Lost"}</h2>
            <img className='end-game-image' 
              src={currentScore===pokemons.length?  "/assets/happy.png":"/assets/sad.png"} 
              alt={currentScore === pokemons.length ? "Happy" : "Sad"}  
            />
            <p>Score : {currentScore}</p>
            <button className='end-game-button' onClick={resetGame}>Play Again?</button>
          </div>
        </div>
      )}
      
      </>
    )
}

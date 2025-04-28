import React from 'react';
import '../styles/endgame.css';

export default function EndGame({ state: { currentScore, gameEnded, pokemons, error }, resetGame }) {
  return (
    <>
      {
        error ? (   // FIRST check for error
          <div className='end-game-container'>
            <div className="end-game-box">
              <h2>{error}</h2>
              <img className='end-game-image' 
                src={"/Memory-Card/assets/sad.png"} 
                alt="Sad"  
              />
              <button className='end-game-button' onClick={resetGame}>Try Again?</button>
            </div>
          </div>
        ) :
        gameEnded && (   // THEN check if game ended
          <div className='end-game-container'>
            <div className="end-game-box">
              <h2>{currentScore === pokemons.length ? "You Won" : "You Lost"}</h2>
              <img className='end-game-image' 
                src={currentScore === pokemons.length ? "/Memory-Card/assets/happy.png" : "/Memory-Card/assets/sad.png"} 
                alt={currentScore === pokemons.length ? "Happy" : "Sad"}  
              />
              <p>Score : {currentScore}</p>
              <button className='end-game-button' onClick={resetGame}>Play Again?</button>
            </div>
          </div>
        )
      }
    </>
  )
}

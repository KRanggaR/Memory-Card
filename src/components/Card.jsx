import React from 'react'
import '../styles/card.css';

function Card({ pokemon, AddPokemon }) {
// console.log(pokemon.name, pokemon.id)
  return (

    <>
      

        {pokemon && (
          <div className='card-container' onClick={()=>AddPokemon(pokemon.id)}>
            <div className='image-block'>
              <img className='pokemon-image' src={pokemon.image} alt="" />
            </div>
            <div className='name-block'>
              <p className='pokemon-name'>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</p>
            </div>
          </div>
    )}

    </>
      // {console.log('This is data from card', data)}
  )
}

export default Card

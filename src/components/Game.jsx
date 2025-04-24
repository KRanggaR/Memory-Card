import React from 'react'

function Game() {

// fetching pokemons
const fetchPokemons = async ()=> {
    try{
    const response =  await fetch('https://pokeapi.co/api/v2/pokemon?limit=50&offset=0')
    const data = await response.json();
    console.log(data)
    }
    
    catch(err) {
    console.error(err)
    
  };
}

  return (
    <>
    <button onClick={fetchPokemons}>FetchPokemons</button>  
    </>
  )
}

export default Game

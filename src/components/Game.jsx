import React, { useEffect, useReducer } from 'react';
import { gameReducer, initialState } from './reducer/gameReducer';
import '../styles/game.css';
import Card from './Card';
import EndGame from './EndGame';
import Difficulty from './Difficulty';
import Buffer from './Buffer';
import pokeBall from '/assets/pokemon-ball.svg';  

function getRandomIds(length) {
    const max = 1000;
    const ids = new Set();
    while (ids.size < length) {
        const randomId = Math.floor(Math.random() * max);
        ids.add(randomId);
    }
    return Array.from(ids);
}

// Fisher-Yates Shuffle function to shuffle array in-place
const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
};

function Game() {
    const [state, dispatch] = useReducer(gameReducer, initialState);

    const fetchPokemonData = async () => {
        try {
            const ids = getRandomIds(state.length);

            const detailedData = await Promise.all(
                ids.map(async (id) => {
                    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
                    const pokemon_details = await res.json();

                    return {
                        id: id,
                        name: pokemon_details.species.name,
                        image: pokemon_details.sprites.other["official-artwork"].front_default,
                    };
                })
            );

            dispatch({
                type: 'DATA_FETCHED_SUCCESS',
                payload: detailedData,
            });
        }
        catch (err) {
            console.error(err.message);
            dispatch({
                type: 'DATA_FETCHED_FAILED',
                payload: err.message,
            });
        };
    }

    useEffect(() => {
        fetchPokemonData();
    }, [state.length]);

    const AddPokemon = (id) => {
        dispatch({
            type: 'SELECT_POKEMON',
            payload: id,
        });

        // Shuffle the pokemons after each card click
        const shuffledPokemons = shuffleArray([...state.pokemons]);
        dispatch({
            type: 'UPDATE_POKEMONS',
            payload: shuffledPokemons,
        });
    }

    const resetGame = async () => {
        dispatch({ type: 'RESET_GAME' });
        setTimeout(fetchPokemonData, 300);
    };

    function getDifficulty(newLength) {
        if (state.length !== newLength) {
            dispatch({ type: 'DIFFICUILTY_ASSIGNED', payload: newLength });
        }
    }

    return (
        <>
            {state.gameIsBuffering && <Buffer />}
            <EndGame state={state} resetGame={resetGame} />
            <div className='game-container'>
                <div className='game-title'>
                    <img className='pokemon-ball-svg' src={pokeBall} alt="Pokemon Ball" />
                    <h2>Pokemon Memory Game</h2>
                    <img className='pokemon-ball-svg' src={pokeBall} alt="Pokemon Ball" />
                </div>
                <div className="game-rule">
                    <p>Get points by clicking on a pokemon but don't click on any more than once!</p>
                </div>
                <div className='difficulty-level-conatiner'>
                    <p>Please Select a Difficulty</p>
                    <div className='difficulty-level-buttons'>
                        <Difficulty text='Easy' getDifficulty={() => getDifficulty(4)} />
                        <Difficulty text='Medium' getDifficulty={() => getDifficulty(8)} />
                        <Difficulty text='Hard' getDifficulty={() => getDifficulty(12)} />
                    </div>
                </div>

                <div className='game-score'>
                    <p>Current Score : {state.currentScore}</p>
                    <p>Best Score : {state.bestScore}</p>
                </div>

                <div className='pokemon-container'>
                    {
                        state.pokemons.map((pokemon) =>
                            <Card
                                pokemon={pokemon} key={pokemon.id}
                                AddPokemon={() => AddPokemon(pokemon.id)}
                            />
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default Game;

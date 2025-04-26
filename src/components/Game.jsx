import React, { useEffect, useReducer } from 'react';
import { gameReducer, initialState } from './reducer/gameReducer';
import '../styles/game.css';
import Card from './Card';
import EndGame from './EndGame';
import Difficulty from './Difficulty';

function getRandomIds(length) {
    const max = 1000;
    const ids = new Set();
    while (ids.size < length) {
        const randomId = Math.floor(Math.random() * max);
        ids.add(randomId);
    }
    return Array.from(ids);
}
function Game() {
    const [state, dispatch] = useReducer(gameReducer, initialState);
    // const [data, setData] = useState([]);

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
                type: 'SET_POKEMONS',
                payload: detailedData,
            });

            // setData(detailedData);
            // console.log(detailedData)
        }

        catch (err) {
            console.error(err.message);
        };

    }
    useEffect(() => {
        fetchPokemonData();
    }, [state.length]);

    const AddPokemon = (id) => {
        dispatch({
            type: 'SELECT_POKEMON',
            payload: id,
        })

    }

    const resetGame = async () => {
        dispatch({ type: 'RESET_GAME' })
        await fetchPokemonData();

    };

    function getDifficulty(newLength) {
        dispatch({ type: 'RESET_GAME' });
        dispatch({ type: 'SET_LENGTH', payload: newLength })
    }
    // console.log(state)
    return (
        <>
            <EndGame state={state} resetGame={resetGame} />
            <div className='game-container'>
                <div className='game-title'>
                    <img className='pokemon-ball-svg' src='../assets/pokemon-ball.svg' ></img>
                    <h2> Pokemon Memory Game</h2>
                    <img className='pokemon-ball-svg' src='../assets/pokemon-ball.svg'></img>
                </div>
                <div className="game-rule">
                    <p>Get points by clicking on a pokemon but don't click on any more than once!</p>
                </div>
                <div className='difficulty-level-conatiner'>
                    <p>Please Select a Difficulty</p>
                    <div className='difficulty-level-buttons'>
                        <Difficulty text='Easy' getDifficulty={()=>getDifficulty(5)}/>
                        <Difficulty text='Medium' getDifficulty={()=>getDifficulty(10)}/>
                        <Difficulty text='Hard' getDifficulty={()=>getDifficulty(15)}/>
                    </div>
                </div>

                <div className='game-score'>
                    <p>Current Score : {state.currentScore}</p>
                    <p>Best Score : {state.bestScore}</p>
                </div>



                <div className='pokemon-container'>
                    {
                        state.pokemons.map((pokemon, index) =>
                            <Card
                                pokemon={pokemon} key={pokemon.id} index={index}
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

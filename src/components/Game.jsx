import React, { useEffect, useReducer } from 'react';
import { gameReducer, initialState } from './reducer/gameReducer';
import '../styles/game.css';
import Card from './Card';

function getRandomIds(length) {
    const max = 1000;
    const ids = new Set();
    while (ids.size < length) {
        const randomId = Math.floor(Math.random() * max);
        ids.add(randomId);
    }
    return Array.from(ids);
}
function Game({ length = 5 }) {
    const [state, dispatch] = useReducer(gameReducer, initialState);
    // const [data, setData] = useState([]);

    const fetchPokemonData = async () => {
        try {
            const ids = getRandomIds(length);

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
    }, []);

    const AddPokemon = (id) => {
        dispatch({
            type: 'SELECT_POKEMON',
            payload: id,
        })
        
    }
    console.log(state)
    return (
        <>
            <div className='game-container'>
                <div className='game-title'>
                    <img className='pokemon-ball-svg' src='../assets/pokemon-ball.svg' ></img>
                    <h2> Pokemon Memory Game</h2>
                    <img className='pokemon-ball-svg' src='../assets/pokemon-ball.svg'></img>
                </div>
                <div className="game-rule">
                    <p>Get points by clicking on a pokemon but don't click on any more than once!</p>
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

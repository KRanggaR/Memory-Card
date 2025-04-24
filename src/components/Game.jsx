import React, {useState} from 'react'

function getRandomIds(length){
    const max=1000;
    const ids = new Set();
    while(ids.size < length) {
        const randomId = Math.floor(Math.random()*max);
        ids.add(randomId);
    }
    return Array.from(ids); 
}
function Game({length=5}) {
    const [data, setData] = useState([]);
    
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
            setData(detailedData);
            console.log(detailedData)
        }

        catch (err) {
            console.error(err.message);
        };

    }
    return (
        <>
            <button onClick={fetchPokemonData}>FetchPokemons</button>
        </>
    )
}

export default Game;

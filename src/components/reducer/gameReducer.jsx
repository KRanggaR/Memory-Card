export const initialState = {
  pokemons: [],
  selectedPokemonsID: [],
  currentScore: 0,
  bestScore: 0,
  gameIsIdle: true,
};

export const gameReducer = (state, action) => {
  switch (action.type) {
    case 'SET_POKEMONS':
      return {
        ...state,
        pokemons: action.payload,
      };
    case 'SELECT_POKEMON': {
      const selected = state.pokemons.find(pokemon => pokemon.id === action.payload);
      if (state.selectedPokemonsID.includes(selected.id)) {
        return {
          selectedPokemonsID: [],
          currentScore: 0,
        }
      }
      else {
        const newCurrentScore = state.currentScore + 1;
        const newBestScore = newCurrentScore > state.bestScore ? newCurrentScore : state.bestScore;

        return {
          ...state,
          selectedPokemonsID: [...state.selectedPokemonsID, selected.id],
          currentScore: newCurrentScore,
          bestScore: newBestScore,
        };
      }

    }
    default:
      return state;
  }
};

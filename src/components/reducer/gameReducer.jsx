export const initialState = {
  pokemons: [],
  selectedPokemonsID: [],
  currentScore: 0,
  bestScore: 0,
  gameIsIdle: true,
  gameEnded: false,
  length: 5,
};

export const gameReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LENGTH':
      return {
        ...state,
        length: action.payload,
      };

    case 'SET_POKEMONS':
      return {
        ...state,
        pokemons: action.payload,
        currentScore: 0,
      };

    case 'SELECT_POKEMON': {
      const selected = state.pokemons.find(pokemon => pokemon.id === action.payload);
      if (state.selectedPokemonsID.includes(selected.id)) {
        return {
          ...state,
          gameEnded: true,
        }
      }

      else {
        const newCurrentScore = state.currentScore + 1;
        const newBestScore = newCurrentScore > state.bestScore ? newCurrentScore : state.bestScore;
        const gameEnded = newCurrentScore === state.pokemons.length;
        return {
          ...state,
          selectedPokemonsID: [...state.selectedPokemonsID, selected.id],
          currentScore: newCurrentScore,
          bestScore: newBestScore,
          gameEnded,
        };
      }
    }

    case 'RESET_GAME':
      return {
        ...state,
        currentScore: 0,
        gameEnded: false,
        selectedPokemonsID: [],
      };
    default:
      return state;
  }
};

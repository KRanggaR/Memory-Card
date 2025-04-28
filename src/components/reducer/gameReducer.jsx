export const initialState = {
  pokemons: [],
  selectedPokemonsID: [],
  currentScore: 0,
  bestScore: 0,
  gameIsBuffering: true,
  gameEnded: false,
  length: 4,
  error: '',
};

export const gameReducer = (state, action) => {
  switch (action.type) {
    case 'DIFFICUILTY_ASSIGNED':
      return {
        ...state,
        length: action.payload,
        bestScore: 0,
        gameIsBuffering: true,
      };

    case 'UPDATE_POKEMONS':
      return {
        ...state,
        pokemons: action.payload,
      };

    case 'DATA_FETCHED_SUCCESS':
      return {
        ...state,
        pokemons: action.payload,
        currentScore: 0,
        gameIsBuffering: false,
        error: '',

      };

    case 'DATA_FETCHED_FAILED':
      return {
        ...state,
        gameIsBuffering: false,
        error: action.payload,
        gameEnded: false,

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
        gameIsBuffering: true,
      };
    default:
      return state;
  }
};

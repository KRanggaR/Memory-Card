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
          return {
              ...state,
              selectedPokemonsID: [...state.selectedPokemonsID, selected.id],
          };
        }
      default:
          return state;
  }
};

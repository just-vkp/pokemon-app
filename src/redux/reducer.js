import {
  FETCH_POKEMON_BEGIN,
  FETCH_POKEMON_SUCCESS,
  FETCH_POKEMON_FAILURE,
  FETCH_POKEMON_DETAILS_BEGIN,
  FETCH_POKEMON_DETAILS_SUCCESS,
  FETCH_POKEMON_DETAILS_FAILURE,
  ADD_TO_SQUAD,
} from "./constants";

const squad = new Array(6).fill({ name: "", imageUrl: "", move: "" });

const initialState = {
  loading: false,
  error: "",
  pokemons: [],
  pokemonDetails: {
    name: "",
    imageUrl: "",
    move: "",
    hp: "",
    attack: "",
    defence: "",
    specialAttack: "",
    specialDefence: "",
    speed: "",
  },
  squad,
  count: 0,
};

export default function pokemonReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_POKEMON_BEGIN:
      return { ...state, loading: true };
    case FETCH_POKEMON_SUCCESS:
      return {
        ...state,
        loading: false,
        pokemons: action.payload,
      };
    case FETCH_POKEMON_FAILURE:
      return {
        ...state,
        loading: false,
        eroor: action.payload,
      };
    default:
      return state;
  }
}

export function selectedPokemonReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_POKEMON_DETAILS_BEGIN:
      return { ...state, loading: true };
    case FETCH_POKEMON_DETAILS_SUCCESS:
      const tempPokDetails = {
        name: action.payload.name,
        imageUrl: action.payload.sprites.front_default,
        move: action.payload.moves[0].move.name,
        hp: action.payload.stats[0].base_stat,
        attack: action.payload.stats[1].base_stat,
        defence: action.payload.stats[2].base_stat,
        specialAttack: action.payload.stats[3].base_stat,
        specialDefence: action.payload.stats[4].base_stat,
        speed: action.payload.stats[5].base_stat,
      };
      return {
        ...state,
        loading: false,
        pokemonDetails: tempPokDetails,
      };
    case FETCH_POKEMON_DETAILS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

export function addToSquadReducer(state = initialState, action) {
  // console.log("initial state", initialState);
  switch (action.type) {
    case ADD_TO_SQUAD:
      return {
        ...state,
        count: state.count + 1,
        squad: action.squad,
      };
    default:
      return state;
  }
}

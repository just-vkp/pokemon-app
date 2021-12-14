import axios from "axios";
import store from "../store/index";
import {
  FETCH_POKEMON_BEGIN,
  FETCH_POKEMON_SUCCESS,
  FETCH_POKEMON_FAILURE,
  FETCH_POKEMON_DETAILS_BEGIN,
  FETCH_POKEMON_DETAILS_SUCCESS,
  FETCH_POKEMON_DETAILS_FAILURE,
  ADD_TO_SQUAD,
} from "./constants";

export const fetchPokemonBegin = () => ({
  type: FETCH_POKEMON_BEGIN,
});

export const fetchPokemonSuccess = (payload) => ({
  type: FETCH_POKEMON_SUCCESS,
  payload,
});

export const fetchPokemonFailure = (payload) => ({
  type: FETCH_POKEMON_FAILURE,
  payload,
});

export const fetchPokemon = () => (dispatch) => {
  dispatch(fetchPokemonBegin());

  axios
    .get("https://pokeapi.co/api/v2/pokemon?limit=20&offset=200")
    .then((res) => {
      dispatch(fetchPokemonSuccess(res.data));
    })
    .catch((err) => {
      dispatch(fetchPokemonFailure(err));
    });
};

export const fetchPokemonDetailsBegin = () => ({
  type: FETCH_POKEMON_DETAILS_BEGIN,
});

export const fetchPokemonDetailsSuccess = (payload) => {
  // console.log(payload);
  return {
    type: FETCH_POKEMON_DETAILS_SUCCESS,
    payload,
  };
};

export const fetchPokemonDetailsFailure = (payload) => ({
  type: FETCH_POKEMON_DETAILS_FAILURE,
  payload,
});

export const fetchPokemonDetails = (pokemonUrl) => (dispatch) => {
  dispatch(fetchPokemonDetailsBegin());
  axios
    .get(pokemonUrl)
    .then((res) => {
      dispatch(fetchPokemonDetailsSuccess(res.data));
    })
    .catch((err) => {
      dispatch(fetchPokemonDetailsFailure(err));
    });
};

export const addToSquad = (payload) => (dispatch) => {
  const state = store.getState();
  const squad = [...state.addToSquadReducer.squad];
  const count = state.addToSquadReducer.count;
  console.log(count, "count");
  const { imageUrl, name, move } = payload;
  const tempObject = {
    name: name,
    imageUrl: imageUrl,
    move: move,
  };
  squad[count] = tempObject;
  dispatch({
    type: ADD_TO_SQUAD,
    squad,
  });
};

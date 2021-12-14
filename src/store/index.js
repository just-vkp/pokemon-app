import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import pokemonReducer from "../redux/reducer";
import { selectedPokemonReducer } from "../redux/reducer";
import { addToSquadReducer } from "../redux/reducer";

const rootReducer = combineReducers({
  pokemonReducer: pokemonReducer,
  selectedPokemonReducer: selectedPokemonReducer,
  addToSquadReducer: addToSquadReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;

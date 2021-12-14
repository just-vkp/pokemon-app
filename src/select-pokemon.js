import React, { Component, Fragment } from "react";
import "./pokemon.css";
import Pokemon_Logo from "./Pokemon_logo.png";
import Squad from "./squad";
import PokemonDetails from "./pokemon-detail";
import "../node_modules/font-awesome/css/font-awesome.min.css";

import { fetchPokemon, fetchPokemonDetails, addToSquad } from "./redux/action";
import { connect } from "react-redux";

class SelectPokemon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSquad: {},
      showPokemon: false,
      activeSuggestion: 0,
      filterSuggestion: [],
      showSuggestion: false,
      userInput: "",
      scrollTop: 0,
      clearButton: "hide-btn-clear",
      addButton: true,
      loading: true,
    };

    this.pokemonList = React.createRef();
    this.pokemonInput = React.createRef();
  }

  componentDidMount() {
    this.props.fetchPokemon();
  }

  onChange = (event) => {
    const pokemons = this.props.pokemons.results;
    const userInput = event.target.value;

    const filterSuggestion = pokemons.filter(
      (suggestion) =>
        suggestion.name.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );
    this.setState({
      activeSuggestion: 0,
      filterSuggestion,
      showSuggestion: true,
      userInput: event.target.value,
    });
  };

  showAllPokemons = () => {
    if (this.state.filterSuggestion.length != 0) {
      this.setState({ filterSuggestion: "" });
    } else {
      this.pokemonInput.current.focus();

      this.setState({
        filterSuggestion: this.props.pokemons.results,
      });
    }
  };

  onClick = (event) => {
    const pokemons = this.props.pokemons.results;
    const pokIndex = pokemons.findIndex(
      (i) => i.name === event.currentTarget.innerText
    );
    this.props.fetchPokemonDetails(pokemons[pokIndex].url);
    let selectedPokemonDetails = this.props.pokemonDetails;

    this.setState({
      activeSuggestion: 0,
      filterSuggestion: [],
      showSuggestion: false,
      userInput: event.currentTarget.innerText,
      showPokemon: true,
      clearButton: "show-btn-clear",
    });
  };

  clearPokemonInput = () => {
    this.setState({ userInput: "", clearButton: "hide-btn-clear" });
    this.pokemonInput.current.focus();
  };

  onKeyDown = (event) => {
    const { activeSuggestion, filterSuggestion } = this.state;
    //When User Press Enter Key
    if (event.keyCode === 13) {
      this.setState({
        activeSuggestion: 0,
        showSuggestion: false,
        userInput: filterSuggestion[activeSuggestion].name,
      });
    }
    //When user Press Up arrow
    else if (event.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }

      let node = this.pokemonList.current;
      const scroll = this.state.scrollTop - 33;
      node.scrollTop = scroll;

      this.setState({
        activeSuggestion: activeSuggestion - 1,
        scrollTop: scroll,
      });
    }
    //When user Press Down arrow
    else if (event.keyCode === 40) {
      if (activeSuggestion - 1 === filterSuggestion.length) {
        return;
      }

      let node = this.pokemonList.current;
      const scroll = 33 + this.state.scrollTop;
      node.scrollTop = scroll;

      this.setState({
        activeSuggestion: activeSuggestion + 1,
        scrollTop: scroll,
      });
    }
  };

  render() {
    const {
      activeSuggestion,
      filterSuggestion,
      userInput,
      showPokemon,
      clearButton,
    } = this.state;
    const { onChange, onClick, onKeyDown } = this;

    const { loading, pokemonDetails } = this.props;

    // console.log("props", this.props);
    // console.log("loading", this.props.loading);
    let suggestionListComponent;

    if (filterSuggestion?.length) {
      suggestionListComponent = (
        <ul className="suggestions" ref={this.pokemonList}>
          {filterSuggestion.map((suggestion, index) => {
            let className;
            if (index === activeSuggestion) {
              className = "suggestion-active";
            }
            return (
              <li
                className={className}
                key={suggestion.name}
                onClick={onClick}
                tabIndex={index}
                // scrollTop={this.state.scrollTop}
              >
                {suggestion.name}
              </li>
            );
          })}
        </ul>
      );
    }

    return (
      <div>
        <img src={Pokemon_Logo} alt="Polemon Logo" className="pokemon-logo" />
        <p className="subtitle">
          <b>Select a Pokemon...</b>
        </p>
        <Fragment>
          <input
            type="text"
            placeholder="Search Pokemon..."
            value={userInput}
            onChange={onChange}
            onKeyDown={onKeyDown}
            onFocus={this.showAllPokemons}
            ref={this.pokemonInput}
          />
          <button onClick={this.clearPokemonInput} className={clearButton}>
            <i className="fa fa-times" />
          </button>
          <i
            className="fa fa-sort-desc btn-in-input"
            onClick={this.showAllPokemons}
          />
          {suggestionListComponent}
        </Fragment>
        <div className="selected-pokemon">
          {loading ? (
            <h2>Loading...</h2>
          ) : (
            <ShowPokemon
              showPokemon={showPokemon}
              pokemonDetails={pokemonDetails}
            />
          )}
        </div>
        <Squad squad={this.props.squad} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  // console.log("state", state);
  return {
    pokemons: state.pokemonReducer.pokemons,
    pokemonDetails: state.selectedPokemonReducer.pokemonDetails,
    loading: state.selectedPokemonReducer.loading,
    squad: state.addToSquadReducer.squad,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchPokemon: () => dispatch(fetchPokemon()),
  fetchPokemonDetails: (pokemonUrl) =>
    dispatch(fetchPokemonDetails(pokemonUrl)),
  addToSquad: (pokemonDetails, count) =>
    dispatch(addToSquad(pokemonDetails, count)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectPokemon);

function ShowPokemon(props) {
  if (props.showPokemon) {
    return (
      <PokemonDetails
        pokemonDetails={props.pokemonDetails}
        selectedSquad={props.selectedSquad}
        addPokemon={props.addPokemon}
      />
    );
  } else {
    return <h3 className="subtitle">Pokemon not selected</h3>;
  }
}

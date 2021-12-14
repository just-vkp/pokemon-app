import React, { Component } from "react";
import "./pokemon.css";
import PropTypes from "prop-types";
import Pokemon_Logo from "./Pokemon_logo.png";
import { connect } from "react-redux";
import { addToSquad } from "./redux/action";

class PokemonDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  addPokemon = () => {
    const { squad, pokemonDetails, count } = this.props;
    console.log("add to squad", squad);
    console.log("pokemon details", pokemonDetails);

    if (count < 6) {
      const found = squad.some((el) => el.name === pokemonDetails.name);

      if (!found) {
        // const successCB = () => {
        //   this.setState((state) => {
        //     return { count: state.count + 1 };
        //   });
        // };
        console.log("true");
        this.props.addToSquad(pokemonDetails);
      }

      // this.setState({ count: this.state.count + 1 });
    }
  };
  render() {
    const selectedPokemonDetails = this.props.pokemonDetails;

    return (
      <div>
        <div className="wrapper">
          <img
            src={selectedPokemonDetails.imageUrl}
            alt={selectedPokemonDetails.name}
            className="pok-image"
          />
          <p className="subtitle">{selectedPokemonDetails.name}</p>
        </div>
        <div className="table-div">
          <table className="stat-table">
            <thead>
              <tr>
                <th>Stats</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>hp</td>
                <td>{selectedPokemonDetails.hp}</td>
              </tr>
              <tr>
                <td>attack</td>
                <td>{selectedPokemonDetails.attack}</td>
              </tr>
              <tr>
                <td>defence</td>
                <td>{selectedPokemonDetails.defence}</td>
              </tr>
              <tr>
                <td>specialAttack</td>
                <td>{selectedPokemonDetails.specialAttack}</td>
              </tr>
              <tr>
                <td>specialDefence</td>
                <td>{selectedPokemonDetails.specialDefence}</td>
              </tr>
              <tr>
                <td>speed</td>
                <td>{selectedPokemonDetails.speed}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <button onClick={this.addPokemon} className="add-pokemon-btn">
          <b>Add Pokemon</b>
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    pokemonDetails: state.selectedPokemonReducer.pokemonDetails,
    squad: state.addToSquadReducer.squad,
    count: state.addToSquadReducer.count,
  };
};

const mapDispatchToProps = (dispatch) => ({
  addToSquad: (pokemonDetails) => dispatch(addToSquad(pokemonDetails)),
});

// PokemonDetails.propTypes = {
//   selectedPokemon: PropTypes.shape({
//     imageUrl: PropTypes.string.isRequired,
//     name: PropTypes.string.isRequired,
//   }),
//   selectedPokemonDetails: PropTypes.shape({
//     hp: PropTypes.number.isRequired,
//     attack: PropTypes.number.isRequired,
//     defence: PropTypes.number.isRequired,
//     specialAttack: PropTypes.number.isRequired,
//     specialDefence: PropTypes.number.isRequired,
//     speed: PropTypes.number.isRequired,
//   }),
// };

PokemonDetails.defaultProps = {
  selectedPokemon: PropTypes.shape({
    imageUrl: { Pokemon_Logo },
    name: "Pokemon",
  }),
  selectedPokemonDetails: PropTypes.shape({
    hp: 0,
    attack: 0,
    defence: 0,
    specialAttack: 0,
    specialDefence: 0,
    speed: 0,
  }),
};

export default connect(mapStateToProps, mapDispatchToProps)(PokemonDetails);

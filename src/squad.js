import React, { Component } from "react";
import PropTypes from "prop-types";
import "./pokemon.css";
import { connect } from "react-redux";

class Squad extends Component {
  render() {
    console.log("SQuad Props", this.props);
    return (
      <div>
        <p className="subtitle">Selected Squad</p>
        <div className="card-container">
          {this.props.squad.map((pokCard, index) =>
            pokCard.name !== "" ? (
              <div className="pok-card" key={index}>
                <img
                  className="pok-image squad-image"
                  src={pokCard.imageUrl}
                  alt={pokCard.name}
                />
                <p>
                  {pokCard.name.charAt(0).toUpperCase() + pokCard.name.slice(1)}
                </p>
                <p className="pok-move">
                  {pokCard.move.charAt(0).toUpperCase() + pokCard.move.slice(1)}
                </p>
              </div>
            ) : (
              <div className="empty-card" key={index}>
                <p>Empty</p>
              </div>
            )
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    squad: state.addToSquadReducer.squad,
  };
};
Squad.propTypes = {
  squad: PropTypes.arrayOf(
    PropTypes.shape({
      imageUrl: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      move: PropTypes.string,
    })
  ),
};

// Squad.defaultProps = {
//   squad: PropTypes.arrayOf(
//     PropTypes.shape({
//       imageUrl: { Pokemon_Logo },
//       name: "Pokemon",
//     })
//   ),
//   move: "No Move",
// };

export default connect(mapStateToProps)(Squad);

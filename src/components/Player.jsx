import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

class Player extends Component {
  render() {
    const { name, picture, score, index } = this.props;

    return (
      <>
        <img src={ picture } alt={ name } />
        <p data-testid={ `player-name-${index}` }>{name}</p>
        <p data-testid={ `player-score-${index}` }>{score}</p>
      </>
    );
  }
}

Player.propTypes = {
  player: PropTypes.objectOf(PropTypes.any),
}.isRequired;

export default Player;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { resetScore } from '../redux/actions';

class Ranking extends Component {
  handleGetRankingFromLocalStorage = () => JSON
    .parse(localStorage.getItem('ranking'))
    .sort((a, b) => b.score - a.score);

  handleClickGoHomeButton = () => {
    const { history: { push }, dispatch } = this.props;

    dispatch(resetScore(0));

    push('/');
  }

  render() {
    const rankingOfPlayers = this.handleGetRankingFromLocalStorage();

    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        {
          rankingOfPlayers.map((player, index) => (
            <div key={ index }>
              <img src={ player.picture } alt={ player.name } />
              <p data-testid={ `player-name-${index}` }>{player.name}</p>
              <p data-testid={ `player-score-${index}` }>{player.score}</p>
            </div>
          ))
        }
        <button
          data-testid="btn-go-home"
          type="button"
          onClick={ this.handleClickGoHomeButton }
        >
          Go home
        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.objectOf(PropTypes.any),
  player: PropTypes.objectOf(PropTypes.any),
}.isRequired;

export default connect()(Ranking);

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { resetScore } from '../redux/actions';
import Player from '../components/Player';
import '../style/css/Rank.css';

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
          rankingOfPlayers.map(({ name, score, picture }, index) => (
            <div key={ index }>
              <Player
                name={ name }
                score={ score }
                picture={ picture }
                index={ index }
              />
            </div>
          ))
        }
        <button
          data-testid="btn-go-home"
          type="button"
          onClick={ this.handleClickGoHomeButton }
          className="home-btn"
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

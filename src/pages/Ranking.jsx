import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { resetScore } from '../redux/actions';

class Ranking extends Component {
  renderRanking = () => JSON.parse(localStorage.getItem('ranking'))
    .sort((a, b) => b.score - a.score);

  handleClickGoHome = () => {
    const { history: { push }, dispatch } = this.props;
    dispatch(resetScore(0));
    push('/');
  }

  render() {
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        {
          this.renderRanking().map((player, index) => (
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
          onClick={ this.handleClickGoHome }
        >
          Go home
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  gravatarEmail: state.player.gravatarEmail,
  score: state.player.score,
  ranking: state.ranking,
});

Ranking.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  player: PropTypes.shape({
    name: PropTypes.string,
    gravatarEmail: PropTypes.string,
  }),
}.isRequired;

export default connect(mapStateToProps)(Ranking);

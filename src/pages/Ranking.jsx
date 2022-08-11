import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addRanking } from '../redux/actions';

class Ranking extends Component {
  state = {
    ranking: [],
  }

  componentDidMount() {
    this.setState({ ranking: JSON.parse(localStorage.getItem('ranking')) });

    this.handleRanking();
  }

  handleRanking = () => {
    const { name, score, gravatarEmail: picture } = this.props;

    const player = {
      name,
      score,
      picture,
    };
    const ranking = localStorage.getItem('ranking')
      ? JSON.parse(localStorage.getItem('ranking'))
      : '';
    const storage = [...ranking, player];
    localStorage.setItem('ranking', JSON.stringify(storage));
  }

  handleClickGoHome = () => {
    const { history: { push } } = this.props;

    push('/');
  }

  render() {
    const { ranking } = this.state;
    return (
      <div>
        <header data-testid="ranking-title">Ranking component</header>
        {
          ranking.map((player, index) => (
            <section key={ index }>
              <img src="gravatar" alt="" />
              <p data-testid={ `player-name-${index}` }>{player.name}</p>
              <p data-testid={ `player-score-${index}` }>{player.score}</p>
            </section>
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

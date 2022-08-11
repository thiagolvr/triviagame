import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import Header from '../components/Header';

class Feedback extends Component {
  componentDidMount() {
    this.setStorage();
  }

  handleClickLogin = () => {
    const { history } = this.props;
    history.push('/');
  }

  handleClickRanking = () => {
    const { history } = this.props;
    history.push('/ranking');
  }

  setStorage = () => {
    const { name, score, gravatarEmail: picture } = this.props;
    const gravatarUrl = `https://www.gravatar.com/avatar/${md5(picture).toString()}`;

    const playerObj = {
      name,
      picture: gravatarUrl,
      score,
    };

    const storage = JSON.parse(localStorage.getItem('ranking'));
    if (storage !== null) {
      const rankingList = [...storage, playerObj];
      return localStorage.setItem('ranking', JSON.stringify(rankingList));
    }
    localStorage.setItem('ranking', JSON.stringify([playerObj]));
  }

  render() {
    const { assertions, score } = this.props;
    const minimumAssertions = 3;

    return (
      <div>
        <Header />
        <h2 data-testid="feedback-text">
          { assertions >= minimumAssertions ? 'Well Done!' : 'Could be better...' }
        </h2>
        <p data-testid="feedback-total-score">
          {score}
        </p>
        <p data-testid="feedback-total-question">
          {assertions}
        </p>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ this.handleClickLogin }
        >
          Play Again
        </button>

        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ this.handleClickRanking }
        >
          Ranking
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  score: state.player.score,
  assertions: state.player.assertions,
  name: state.player.name,
  gravatarEmail: state.player.gravatarEmail,
});

Feedback.propTypes = {
  history: PropTypes.objectOf(PropTypes.any),
  player: PropTypes.objectOf(PropTypes.any),
}.isRequired;

// export default Feedback;
export default connect(mapStateToProps)(Feedback);

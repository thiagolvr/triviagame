import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import Header from '../components/Header';

class Feedback extends Component {
  componentDidMount() {
    this.setPlayersToLocalStorage();
  }

  handleClickLogin = () => {
    const {
      history: { push },
    } = this.props;
    push('/');
  };

  handleClickRanking = () => {
    const {
      history: { push },
    } = this.props;
    push('/ranking');
  };

  setPlayersToLocalStorage = () => {
    const { name, score, gravatarEmail } = this.props;
    const gravatarUrl = `https://www.gravatar.com/avatar/${md5(
      gravatarEmail,
    ).toString()}`;

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
  };

  render() {
    const { assertions, score } = this.props;
    const minimumAssertions = 3;

    return (
      <div>
        <Header />
        <h2 data-testid="feedback-text">
          {assertions >= minimumAssertions
            ? 'Well Done!'
            : 'Could be better...'}
        </h2>
        <p data-testid="feedback-total-score">{score}</p>
        <p data-testid="feedback-total-question">{assertions}</p>
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

const mapStateToProps = ({ player }) => player;

Feedback.propTypes = {
  history: PropTypes.objectOf(PropTypes.any),
  player: PropTypes.objectOf(PropTypes.any),
}.isRequired;

export default connect(mapStateToProps)(Feedback);

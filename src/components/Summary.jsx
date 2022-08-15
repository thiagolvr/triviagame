import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

class Summary extends Component {
  render() {
    const {
      assertions,
      minimumAssertions,
      score,
      handleClickLogin,
      handleClickRanking,
    } = this.props;

    return (
      <div>
        <h2 data-testid="feedback-text">
          {
            assertions >= minimumAssertions
              ? 'Well Done!'
              : 'Could be better...'
          }
        </h2>
        <div>
          <strong>
            Score:
            {' '}
          </strong>
          <span data-testid="feedback-total-score">{score}</span>
        </div>
        <strong>
          Number of hits:
          {' '}
        </strong>
        <span data-testid="feedback-total-question">{assertions}</span>
        <div>
          <button
            type="button"
            data-testid="btn-play-again"
            onClick={ handleClickLogin }
            className="btn-play-again"
          >
            Play Again
          </button>

          <button
            type="button"
            data-testid="btn-ranking"
            className="btn-ranking"
            onClick={ handleClickRanking }
          >
            Ranking
          </button>
        </div>
      </div>
    );
  }
}

Summary.propTypes = {
  props: PropTypes.objectOf(PropTypes.any),
}.isRequired;

export default Summary;

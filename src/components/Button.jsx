import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { correctAnswer } from '../helpers/constants';

class Button extends Component {
  render() {
    const {
      answer,
      correct,
      indexButton,
      isButtonsDisabled,
      handleClickAnAnswer,
    } = this.props;

    return (
      <button
        data-testid={
          answer === correct
            ? correctAnswer
            : `wrong-answer-${indexButton}`
        }
        type="button"
        key={ indexButton }
        disabled={ isButtonsDisabled }
        onClick={ handleClickAnAnswer }
      >
        {answer}
      </button>
    );
  }
}

Button.propTypes = {
  player: PropTypes.objectOf(PropTypes.any),
}.isRequired;

export default Button;

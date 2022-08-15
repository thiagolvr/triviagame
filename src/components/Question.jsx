import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { saveScore, saveAssertions } from '../redux/actions';
import '../style/css/Question.css';
import { correctAnswer, incorrectAnswers } from '../helpers/constants';
import Button from './Button';

let timerID;

class Question extends Component {
  state = {
    question: {},
    isButtonsDisabled: false,
    timer: 30,
    randomAnswers: [],
    answered: false,
    counter: 0,
    assertions: 0,
  };

  componentDidMount() {
    this.handleStartGame();
  }

  componentWillUnmount() {
    clearInterval(timerID);
  }

  handleTimeForQuestion = () => {
    const ONE_SECOND = 1000;
    const INTERVAL_ID = setInterval(() => {
      this.setState(
        (prevState) => ({
          timer: prevState.timer - 1,
        }),
        () => {
          const { timer } = this.state;

          if (timer === 0) {
            this.setState({ isButtonsDisabled: true, answered: true });
            clearInterval(INTERVAL_ID);
          }
        },
      );
    }, ONE_SECOND);

    timerID = INTERVAL_ID;
  };

  handleStartGame = () => {
    const { questions } = this.props;
    const { counter } = this.state;

    const question = questions.find((item) => +item.id === +counter);
    this.setState({ question }, () => {
      this.handleTimeForQuestion();
      this.randomAnswersToState();
    });
  };

  questionDifficultyCalculator = () => {
    const {
      question: { difficulty },
      timer,
    } = this.state;
    const setScore = 10;

    const difficultyNumber = {
      easy: 1,
      medium: 2,
      hard: 3,
    };

    const equation = setScore + timer * difficultyNumber[difficulty];
    return equation;
  };

  handleClickAnAnswer = ({ target }) => {
    this.setState({ answered: true });
    const { dispatch } = this.props;
    const buttons = target.parentNode.children;
    Array.from(buttons).forEach((btn) => {
      const answers = btn.dataset.testid;
      btn.className = answers === correctAnswer ? correctAnswer : incorrectAnswers;
    });

    if (target.className === correctAnswer) {
      dispatch(saveScore(this.questionDifficultyCalculator()));
      this.setState(
        (prevState) => ({ assertions: prevState.assertions + 1 }),
        () => {
          const { assertions } = this.state;
          dispatch(saveAssertions(assertions));
        },
      );
    }

    this.setState({ isButtonsDisabled: true });
  };

  handleClickNextButton = ({ target }) => {
    const { history: { push }, questions } = this.props;
    const { counter } = this.state;
    const lastIndex = 4;

    this.setState({ answered: false, timer: 30, isButtonsDisabled: false });

    if (counter === lastIndex) return push('/feedback');

    const buttonsOfAnswers = target.parentNode.children[3].children;
    Array.from(buttonsOfAnswers).forEach((button) => {
      button.classList.remove(incorrectAnswers);
      button.classList.remove(correctAnswer);
    });

    this.setState(
      (prevState) => ({ counter: prevState.counter + 1 }),
      () => {
        this.setState({ question: questions[counter + 1] }, () => {
          this.randomAnswersToState();
        });
      },
    );
  };

  randomAnswersToState = () => {
    const {
      question: { incorrect_answers: incorrect, correct_answer: correct },
    } = this.state;
    const answers = incorrect ? [...incorrect, correct] : [];
    const randomAnswers = this.handleRandomizeAnswers(answers);

    this.setState({ randomAnswers });
  };

  handleRandomizeAnswers(answers) {
    const originalAnswers = [...answers];
    const randomizedAnswers = [];

    while (originalAnswers.length) {
      const randomIndex = Math.floor(Math.random() * originalAnswers.length);
      randomizedAnswers.push(originalAnswers[randomIndex]);
      originalAnswers.splice(randomIndex, 1);
    }

    return randomizedAnswers;
  }

  render() {
    const {
      question: { category, question: text, correct_answer: correct },
      isButtonsDisabled,
      timer,
      randomAnswers,
      answered,
    } = this.state;

    return (
      <div>
        <span>
          <strong>Time left:</strong>
          {' '}
          {timer}
        </span>
        <p data-testid="question-category">
          <strong>Category:</strong>
          {' '}
          {category}
        </p>
        <p data-testid="question-text"><strong>{text}</strong></p>
        <div data-testid="answer-options">
          {
            randomAnswers.map((answer, indexButton) => (
              <Button
                key={ indexButton }
                answer={ answer }
                correct={ correct }
                indexButton={ indexButton }
                isButtonsDisabled={ isButtonsDisabled }
                handleClickAnAnswer={ this.handleClickAnAnswer }
              />
            ))
          }
        </div>

        {
          answered && (
            <button
              data-testid="btn-next"
              type="button"
              onClick={ this.handleClickNextButton }
              className="next-btn"
            >
              Next
            </button>
          )
        }
      </div>
    );
  }
}

Question.propTypes = {
  match: PropTypes.objectOf(PropTypes.any),
}.isRequired;

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(Question);

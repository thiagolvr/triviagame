import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchTrivia } from '../services/triviaAPI';
import { saveScore } from '../redux/actions';
import '../CSS/CardQuestion.css';

class CardQuestion extends Component {
  state = {
    question: {},
    isButtonsDisabled: false,
    timer: 30,
    randomArray: [],
    answered: false,
  };

  async componentDidMount() {
    await this.handleGetIn();
    this.handleTimerLimit();
    this.randomArrayToState();
  }

  handleTimerLimit = () => {
    const ONE_SECOND = 1000;
    const interval = setInterval(() => {
      this.setState((prevState) => ({
        timer: prevState.timer - 1,
      }), () => {
        const { timer } = this.state;
        if (timer === 0) {
          this.setState({ isButtonsDisabled: true });
          clearInterval(interval);
        }
      });
    }, ONE_SECOND);
  }

  handleGetIn = async () => {
    const token = localStorage.getItem('token');
    const { questions } = await fetchTrivia(token);
    const { match: { params: { id } } } = this.props;
    const question = await questions.find((item) => +item.id === +id);

    this.setState({ question });
  };

  questionDifficulty = () => {
    const { question: { difficulty }, timer } = this.state;
    const hard = 3;
    const setScore = 10;
    let currentDifficulty;
    if (difficulty === 'easy') currentDifficulty = 1;
    if (difficulty === 'medium') currentDifficulty = 2;
    if (difficulty === 'hard') currentDifficulty = hard;
    const equation = setScore + (timer * currentDifficulty);
    return equation;
  }

  handleClick = ({ target }) => {
    this.setState({ answered: true });
    const { dispatch } = this.props;
    const arr = target.parentNode.children;
    const correctAnswer = 'correct-answer';
    Array.from(arr).forEach((btn) => {
      const answers = btn.dataset.testid;
      if (answers === correctAnswer) {
        btn.className = correctAnswer;
      } else {
        btn.className = 'incorrect-answers';
      }
    });
    if (target.className === correctAnswer) {
      dispatch(saveScore(this.questionDifficulty()));
    }
  }

  randomArrayToState = () => {
    const {
      question: {
        incorrect_answers: incorrect,
        correct_answer: correct,
      },
    } = this.state;
    const answers = incorrect ? [...incorrect, correct] : [];
    const randomAnswers = this.handleCreateRandom(answers);
    this.setState({ randomArray: randomAnswers });
  }

  handleCreateRandom(arr) {
    const myArr = [...arr];
    const randomizedArr = [];

    while (myArr.length > 0) {
      const randomIndex = Math.floor(Math.random() * myArr.length);
      randomizedArr.push(myArr[randomIndex]);
      myArr.splice(randomIndex, 1);
    }

    return randomizedArr;
  }

  render() {
    const {
      question,
      question: {
        category,
        question: text,
        correct_answer: correct,
      },
      isButtonsDisabled,
      timer,
      randomArray,
      answered,
    } = this.state;

    return (
      <div>
        {question && (
          <div>
            <span>{timer}</span>
            <p data-testid="question-category">{category}</p>
            <p data-testid="question-text">{text}</p>
            <div data-testid="answer-options">
              {randomArray.map((answer, index2) => (
                <button
                  key={ index2 }
                  disabled={ isButtonsDisabled }
                  data-testid={
                    answer === correct
                      ? 'correct-answer'
                      : `wrong-answer-${index2}`
                  }
                  type="button"
                  onClick={ this.handleClick }
                >
                  {answer}
                </button>
              ))}
            </div>
          </div>
        )}
        { answered && (
          <button
            data-testid="btn-next"
            type="button"
          >
            Next
          </button>
        )}
      </div>
    );
  }
}

CardQuestion.propTypes = {
  match: PropTypes.objectOf(PropTypes.any),
}.isRequired;

const mapStateToProps = (state) => ({
  score: state.player.score,
});

export default connect(mapStateToProps)(CardQuestion);

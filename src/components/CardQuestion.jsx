import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { fetchTrivia } from '../services/triviaAPI';
import '../CSS/CardQuestion.css';

class CardQuestion extends Component {
  state = {
    question: {},
    isButtonsDisabled: false,
    timer: 30,
    randomArray: [],
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

  handleClick = ({ target }) => {
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
    } = this.state;

    return (
      <div>
        {question && (
          <div>
            <p data-testid="question-category">{category}</p>
            <p data-testid="question-text">{text}</p>
            <span>{timer}</span>
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
      </div>
    );
  }
}

CardQuestion.propTypes = {
  match: PropTypes.objectOf(PropTypes.any),
}.isRequired;

export default CardQuestion;

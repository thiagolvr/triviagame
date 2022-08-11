import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { saveScore, saveAssertions } from '../redux/actions';
import '../CSS/CardQuestion.css';

const correctAnswer = 'correct-answer';

class CardQuestion extends Component {
  state = {
    question: {},
    isButtonsDisabled: false,
    timer: 30,
    randomArray: [],
    answered: false,
    counter: 0,
    assertions: 0,
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
          this.setState({ isButtonsDisabled: true, answered: true });
          clearInterval(interval);
        }
      });
    }, ONE_SECOND);
  }

  handleGetIn = async () => {
    const { questions } = this.props;
    const { counter } = this.state;
    const question = await questions.find((item) => +item.id === +counter);
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
      this.setState((prevState) => ({ assertions: prevState.assertions + 1 }), () => {
        const { assertions } = this.state;
        dispatch(saveAssertions(assertions));
      });
    }
    this.setState({ isButtonsDisabled: true });
  }

  handleNext = ({ target }) => {
    const { history } = this.props;
    const { counter } = this.state;
    const lastIndex = 4;

    this.setState({ answered: false, timer: 30, isButtonsDisabled: false });

    if (counter === lastIndex) {
      return history.push('/feedback');
    }

    const { questions } = this.props;
    const btnsElements = target.parentNode.children[0].lastChild.children;
    Array.from(btnsElements).forEach((el) => {
      el.classList.remove('incorrect-answers');
      el.classList.remove(correctAnswer);
    });

    this.setState((prevState) => ({ counter: prevState.counter + 1 }), () => {
      this.setState({ question: questions[counter + 1] }, () => {
        this.randomArrayToState();
      });
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
            onClick={ this.handleNext }
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
  questions: state.questionsReducer.questions,
});

export default connect(mapStateToProps)(CardQuestion);

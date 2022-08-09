import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { fetchTrivia } from '../services/triviaAPI';

class CardQuestion extends Component {
  state = {
    question: {},
  };

  componentDidMount() {
    this.handleGetIn();
  }

  handleGetIn = async () => {
    const token = localStorage.getItem('token');
    const { questions } = await fetchTrivia(token);
    const { match: { params: { id } } } = this.props;
    const question = await questions.find((item) => +item.id === +id);

    this.setState({ question });
  };

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
        incorrect_answers: incorrect,
        correct_answer: correct,
      },
    } = this.state;

    const answers = incorrect ? [...incorrect, correct] : [];
    const randomAnswers = this.handleCreateRandom(answers);

    return (
      <div>
        hi
        {question && (
          <div>
            <p data-testid="question-category">{category}</p>
            <p data-testid="question-text">{text}</p>

            <div data-testid="answer-options">
              {randomAnswers.map((answer, index2) => (
                <button
                  key={ index2 }
                  data-testid={
                    answer === correct
                      ? 'correct-answer'
                      : `wrong-answer-${index2}`
                  }
                  type="button"
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

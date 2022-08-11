import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { fetchTrivia } from '../services/triviaAPI';
import { saveQuestions } from '../redux/actions';

import CardQuestion from '../components/CardQuestion';

class Game extends Component {
  async componentDidMount() {
    const { dispatch } = this.props;
    const token = localStorage.getItem('token');
    const { questions } = await fetchTrivia(token);
    dispatch(saveQuestions(questions));
  }

  render() {
    const { questions } = this.props;
    return (
      <div>
        <Header />
        {
          questions.length
            && <CardQuestion { ...this.props } />
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.questionsReducer.questions,
});

Game.propTypes = {
  questions: PropTypes.array,
}.isRequired;

export default connect(mapStateToProps)(Game);

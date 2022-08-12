import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { fetchTrivia } from '../services/triviaAPI';
import { saveQuestions } from '../redux/actions';

import Question from '../components/Question';

class Game extends Component {
  componentDidMount() {
    this.handleStart();
  }

  handleStart = async () => {
    const { dispatch } = this.props;

    const token = localStorage.getItem('token');

    const { questions } = await fetchTrivia(token);

    dispatch(saveQuestions(questions));
  }

  render() {
    const { questions, match: { path } } = this.props;
    return (
      <div>
        {
          path
            && <Header path={ path } />
        }

        {
          questions.length
            && <Question { ...this.props } />
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => state;

Game.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.any),
}.isRequired;

export default connect(mapStateToProps)(Game);

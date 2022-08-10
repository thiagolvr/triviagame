import React, { Component } from 'react';
import Header from '../components/Header';
import { fetchTrivia } from '../services/triviaAPI';
import CardQuestion from '../components/CardQuestion';

class Game extends Component {
  state = {
    questions: [],
  }

  async componentDidMount() {
    const token = localStorage.getItem('token');

    const { questions } = await fetchTrivia(token);

    this.setState({ questions });
  }

  render() {
    const { questions } = this.state;
    return (
      <div>
        <Header />
        {
          questions.length
            && <CardQuestion questions={ questions } { ...this.props } />
        }
      </div>
    );
  }
}

export default Game;

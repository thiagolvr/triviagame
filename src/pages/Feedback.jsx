import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import Header from '../components/Header';
import Summary from '../components/Summary';
import { minimumAssertions } from '../helpers/constants';
import { resetScore } from '../redux/actions';
import '../style/css/Feedback.css';

class Feedback extends Component {
  componentDidMount() {
    this.setPlayersToLocalStorage();
  }

  handleClickLogin = () => {
    const {
      history: { push },
      dispatch,
    } = this.props;
    push('/');
    dispatch(resetScore(0));
  };

  handleClickRanking = () => {
    const {
      history: { push },
    } = this.props;
    push('/ranking');
  };

  setPlayersToLocalStorage = () => {
    const { name, score, gravatarEmail } = this.props;
    const gravatarUrl = `https://www.gravatar.com/avatar/${md5(
      gravatarEmail,
    ).toString()}`;

    const playerObj = {
      name,
      picture: gravatarUrl,
      score,
    };

    const storage = JSON.parse(localStorage.getItem('ranking'));

    if (storage !== null) {
      const rankingList = [...storage, playerObj];

      return localStorage.setItem('ranking', JSON.stringify(rankingList));
    }

    localStorage.setItem('ranking', JSON.stringify([playerObj]));
  };

  render() {
    const { assertions, score } = this.props;

    return (
      <div>
        <Header />
        <Summary
          assertions={ assertions }
          minimumAssertions={ minimumAssertions }
          score={ score }
          handleClickLogin={ this.handleClickLogin }
          handleClickRanking={ this.handleClickRanking }
        />
      </div>
    );
  }
}

const mapStateToProps = ({ player }) => player;

Feedback.propTypes = {
  history: PropTypes.objectOf(PropTypes.any),
  player: PropTypes.objectOf(PropTypes.any),
}.isRequired;

export default connect(mapStateToProps)(Feedback);

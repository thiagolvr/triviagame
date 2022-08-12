import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';

class Header extends Component {
  handleScores = () => {
    const { score } = this.props;
    if (score) {
      return score;
    }
    return 0;
  }

  render() {
    const { name, gravatarEmail, path } = this.props;
    const score = this.handleScores();
    const gravatarUrl = `https://www.gravatar.com/avatar/${md5(gravatarEmail).toString()}`;

    return (
      <div>
        {
          path !== '/game'
            ? (
              <div>
                <strong>Check your result below.</strong>
                {' '}
                <span hidden data-testid="header-score">{score}</span>
              </div>
            )
            : (
              <>
                <strong>Current score:</strong>
                {' '}
                <span data-testid="header-score">{score}</span>
              </>
            )
        }

        <div>
          <img
            src={ gravatarUrl }
            alt="gravatar"
            data-testid="header-profile-picture"
          />
        </div>
        {' '}
        {
          name
            ? <span data-testid="header-score">You are logged in as:</span>
            : <span data-testid="header-score">You are not logged in.</span>
        }
        {' '}
        <strong><big data-testid="header-player-name">{name}</big></strong>
      </div>
    );
  }
}

Header.propTypes = {
  player: PropTypes.objectOf(PropTypes.any),
}.isRequired;

const mapStateToProps = ({ player }) => player;

export default connect(mapStateToProps)(Header);

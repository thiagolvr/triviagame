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
    const { name, gravatarEmail } = this.props;

    const gravatarUrl = `https://www.gravatar.com/avatar/${md5(gravatarEmail).toString()}`;
    return (
      <div>
        <span data-testid="header-score">{this.handleScores()}</span>
        <br />
        <img
          src={ gravatarUrl }
          alt="gravatar"
          data-testid="header-profile-picture"
        />
        <br />
        <span data-testid="header-player-name">{name}</span>
      </div>
    );
  }
}

Header.propTypes = {
  player: PropTypes.shape({
    name: PropTypes.string,
    gravatarEmail: PropTypes.string,
  }),
}.isRequired;

const mapStateToProps = (state) => ({
  name: state.player.name,
  gravatarEmail: state.player.gravatarEmail,
  score: state.player.score,
});

export default connect(mapStateToProps)(Header);

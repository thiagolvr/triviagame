import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { player: { name, gravatarEmail } } = this.props;
    const gravatarUrl = `https://www.gravatar.com/avatar/${md5(gravatarEmail).toString()}`;
    return (
      <div>
        <img
          src={ gravatarUrl }
          alt="gravatar"
          data-testid="header-profile-picture"
        />
        <span data-testid="header-player-name">{name}</span>
        <span data-testid="header-score">0</span>
      </div>
    );
  }
}

Header.propTypes = {
  player: PropTypes.objectOf(PropTypes.any),
}.isRequired;

const mapStateToProps = (player) => player;

export default connect(mapStateToProps)(Header);

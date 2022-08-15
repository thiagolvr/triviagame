import PropTypes from 'prop-types';
import React, { Component } from 'react';
import '../style/css/Login.css';

class Form extends Component {
  render() {
    const {
      name,
      gravatarEmail,
      isButtonDisabled,
      handleChangeInput,
      handleClickPlay,
      handleClickSettings,
    } = this.props;

    return (
      <div className="login-box">
        <form>
          <h3>Welcome to Trivia</h3>
          <div className="user-box">
            <input
              data-testid="input-player-name"
              type="text"
              id="name"
              value={ name }
              onChange={ handleChangeInput }
              className="input-name"
              required
            />
            <p>Name</p>
          </div>
          <div className="user-box">
            <input
              data-testid="input-gravatar-email"
              type="email"
              id="gravatarEmail"
              value={ gravatarEmail }
              onChange={ handleChangeInput }
              className="input-email"
              required
            />
            <p>Email</p>
          </div>
          <button
            data-testid="btn-play"
            type="button"
            id="isButtonDisabled"
            onClick={ handleClickPlay }
            disabled={ isButtonDisabled }
            className="play-btn"
          >
            <span />
            <span />
            <span />
            <span />
            Play
          </button>
          <button
            data-testid="btn-settings"
            type="button"
            onClick={ handleClickSettings }
            className="settings-btn"
          >
            Settings
          </button>
        </form>

      </div>
    );
  }
}

Form.propTypes = {
  props: PropTypes.objectOf(PropTypes.any),
}.isRequired;

export default Form;

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
      <form className="login-form">
        <label htmlFor="inputName">
          <input
            data-testid="input-player-name"
            type="text"
            id="name"
            value={ name }
            placeholder="Type your name"
            onChange={ handleChangeInput }
            className="input-name"
          />
        </label>
        <br />
        <label htmlFor="inputEmail">
          <input
            data-testid="input-gravatar-email"
            type="email"
            id="gravatarEmail"
            placeholder="Type your email"
            value={ gravatarEmail }
            onChange={ handleChangeInput }
            className="input-email"
          />
          <br />
          <button
            data-testid="btn-play"
            type="button"
            id="isButtonDisabled"
            onClick={ handleClickPlay }
            disabled={ isButtonDisabled }
            className="play-btn"
          >
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
        </label>
      </form>
    );
  }
}

Form.propTypes = {
  props: PropTypes.objectOf(PropTypes.any),
}.isRequired;

export default Form;

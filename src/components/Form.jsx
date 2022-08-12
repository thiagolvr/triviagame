import PropTypes from 'prop-types';
import React, { Component } from 'react';

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
            placeholder="Digite seu nome"
            onChange={ handleChangeInput }
          />
        </label>
        <label htmlFor="inputEmail">
          <input
            data-testid="input-gravatar-email"
            type="email"
            id="gravatarEmail"
            placeholder="Digite seu email"
            value={ gravatarEmail }
            onChange={ handleChangeInput }
          />
          <button
            data-testid="btn-play"
            type="button"
            id="isButtonDisabled"
            onClick={ handleClickPlay }
            disabled={ isButtonDisabled }
          >
            Play
          </button>
          <button
            data-testid="btn-settings"
            type="button"
            onClick={ handleClickSettings }
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

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setToken } from '../helpers/triviaAPI';
import { addUser } from '../redux/actions';

class Login extends Component {
    state = {
      name: '',
      gravatarEmail: '',
      isButtonDisabled: true,
    };

    handleChange = ({ target: { id, value } }) => {
      this.setState({
        [id]: value,
      }, () => {
        const { name, gravatarEmail } = this.state;
        return name && gravatarEmail
          ? this.setState({ isButtonDisabled: false })
          : this.setState({ isButtonDisabled: true });
      });
    }

    handleCLick = async () => {
      const { history, dispatch } = this.props;
      const { name, gravatarEmail } = this.state;
      await setToken();
      history.push('/game');
      dispatch(addUser({ name, gravatarEmail }));
    }

    handleSettingsBtn = () => {
      const { history } = this.props;
      history.push('/settings');
    }

    render() {
      const { name, gravatarEmail, isButtonDisabled } = this.state;
      return (
        <form>
          <label htmlFor="inputName">
            <input
              type="text"
              id="name"
              data-testid="input-player-name"
              value={ name }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="inputEmail">
            <input
              type="email"
              id="gravatarEmail"
              data-testid="input-gravatar-email"
              value={ gravatarEmail }
              onChange={ this.handleChange }
            />
            <button
              data-testid="btn-play"
              type="button"
              id="isButtonDisabled"
              onClick={ this.handleCLick }
              disabled={ isButtonDisabled }
            >
              Play
            </button>
            <button
              data-testid="btn-settings"
              type="button"
              onClick={ this.handleSettingsBtn }
            >
              Settings
            </button>
          </label>
        </form>
      );
    }
}

Login.propTypes = {
  history: PropTypes.objectOf(PropTypes.any),
}.isRequired;

export default connect()(Login);

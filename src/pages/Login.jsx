import React, { Component } from 'react';

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
              // onCLick={}
              disabled={ isButtonDisabled }
            >
              Play

            </button>
          </label>
        </form>
      );
    }
}

export default Login;

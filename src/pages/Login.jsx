import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import setToken from '../helpers/localStorage';
import { addUser } from '../redux/actions';
import Form from '../components/Form';

class Login extends Component {
    state = {
      name: '',
      gravatarEmail: '',
      isButtonDisabled: true,
    };

    handleChangeInput = ({ target: { id, value } }) => {
      this.setState({
        [id]: value,
      }, () => {
        const { name, gravatarEmail } = this.state;
        return name && gravatarEmail
          ? this.setState({ isButtonDisabled: false })
          : this.setState({ isButtonDisabled: true });
      });
    }

    handleClickPlay = async () => {
      const { dispatch, history: { push } } = this.props;
      const { name, gravatarEmail } = this.state;

      await setToken();

      const code = localStorage.getItem('code');

      if (code !== '0') {
        localStorage.removeItem('token');
        return push('/');
      }

      dispatch(addUser({ name, gravatarEmail }));

      push('/game');
    }

    handleClickSettings = () => {
      const { history: { push } } = this.props;
      push('/settings');
    }

    render() {
      return (
        <Form
          { ...this.state }
          handleClickPlay={ this.handleClickPlay }
          handleClickSettings={ this.handleClickSettings }
          handleChangeInput={ this.handleChangeInput }
        />
      );
    }
}

Login.propTypes = {
  history: PropTypes.objectOf(PropTypes.any),
}.isRequired;

export default connect()(Login);

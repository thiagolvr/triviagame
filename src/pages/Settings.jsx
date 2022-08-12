import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

class Settings extends Component {
  render() {
    const { history: { goBack } } = this.props;

    return (
      <div>
        <header>
          <h1 data-testid="settings-title">Settings</h1>
        </header>
        <button
          type="button"
          onClick={ goBack }
        >
          Go back
        </button>
      </div>
    );
  }
}

Settings.propTypes = {
  history: PropTypes.objectOf(PropTypes.any),
}.isRequired;

export default Settings;

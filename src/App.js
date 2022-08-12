import React, { Component } from 'react';
import logo from './trivia.png';
import './style/css/App.css';
import Routes from './routes/Routes';

class App extends Component {
  render() {
    return (
      <div>
        <header className="App-logo">
          <img src={ logo } className="App-logo" alt="logo" />
        </header>
        <Routes />
      </div>
    );
  }
}

export default App;

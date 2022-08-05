import React from 'react';
import { Route } from 'react-router-dom';
import Login from './pages/Login';
import './App.css';

export default function App() {
  return (
    <Route path="/" component={ Login } />
  );
}

import { screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import Login from '../pages/Login';
import App from '../App';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';


test('Testar se o score é renderizado na tela de jogo', () => {
     const { history } = renderWithRouterAndRedux(<App />);
     history.push('/game');
     const score = screen.getAllByTestId("header-score");
     
     expect(score[0]).toBeInTheDocument();
     expect(score[0]).toHaveTextContent(0);

});

test('Testar se imagem gravatar é renderizada na tela de jogo', () => {

});

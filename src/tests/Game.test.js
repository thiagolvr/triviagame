import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import { screen } from '@testing-library/react';
import { questionsResponse } from './helpers/data';
describe('test if the questions component', () => {
  test('test if he game starts with questions', async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => questionsResponse
    }));

    renderWithRouterAndRedux(<App/>);

    const playButton = screen.getByRole('button', { name: 'Play' });
    userEvent.type(screen.getByTestId('input-gravatar-email'), 'alguem@email.com');
    userEvent.type(screen.getByTestId('input-player-name'), 'alguem');
    userEvent.click(playButton);

    const firstQuestion = await screen.findByText('The Republic of Malta is the smallest microstate worldwide.');
    const firstBtnFirstQuestion = await screen.findByText('False');
    const caretogyFirstQuestion = await screen.findByText('Geography');

    expect(firstQuestion).toBeInTheDocument();
    expect(firstBtnFirstQuestion).toBeInTheDocument();
    expect(caretogyFirstQuestion).toBeInTheDocument();

  });
})
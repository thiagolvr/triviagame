import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import { screen, waitFor } from '@testing-library/react';
import questionsResponse from './helpers/data';

describe('test if the questions component', () => {

  // it('a', () => {
  //   localStorage.setItem('code', '1');
  //   const { history } = renderWithRouterAndRedux(<App/>);

  //   const playButton = screen.getByRole('button', { name: 'Play' });
  //   userEvent.type(screen.getByTestId('input-gravatar-email'), 'alguem@email.com');
  //   userEvent.type(screen.getByTestId('input-player-name'), 'alguem');
  //   userEvent.click(playButton);
  //   expect(JSON.parse(localStorage.getItem('token'))).toBe(null);
  //   expect(history.location.pathname).toBe('/')
  // })

  jest.useFakeTimers();
  // jest.spyOn(global, 'setTimeout');

  test('test if he game starts with questions', async () => {
    localStorage.setItem('code', '0');

    global.fetch = jest.fn(async () => ({
      json: async () => questionsResponse
    }));
    const { history } = renderWithRouterAndRedux(<App/>);

    const playButton = screen.getByRole('button', { name: 'Play' });
    userEvent.type(screen.getByTestId('input-gravatar-email'), 'alguem@email.com');
    userEvent.type(screen.getByTestId('input-player-name'), 'alguem');
    userEvent.click(playButton);
    expect(localStorage.getItem('code')).toBe('0');

    const firstQuestion = await screen.findByText('The Republic of Malta is the smallest microstate worldwide.');
    const correctAnswer_1 = await screen.findByText('False');
    const categoryFirstQuestion = await screen.findByText('Geography');
    const currentScore = await screen.findByText(/current score:/i);
    const gravatarImg = await screen.findByRole('img', { name: /gravatar/i})

    expect(history.location.pathname).toBe('/game')
    expect(currentScore).toBeInTheDocument();
    expect(firstQuestion).toBeInTheDocument();
    expect(correctAnswer_1).toBeInTheDocument();
    expect(gravatarImg).toBeInTheDocument();
    expect(categoryFirstQuestion).toBeInTheDocument();

    userEvent.click(correctAnswer_1);

    const nextBtn = await screen.findByTestId('btn-next');
    const scoreScreen1 = await screen.findByText('40');
    expect(scoreScreen1).toBeInTheDocument();
    userEvent.click(nextBtn);

    const secondQuestion = await screen.findByText('In quantum physics, which of these theorised sub-atomic particles has yet to be observed?');
    const incorrectAnswer_2 = await screen.findByText('Z boson');
    const categorySecondQuestion = await screen.findByText('Science & Nature');

    expect(currentScore).toBeInTheDocument();
    expect(secondQuestion).toBeInTheDocument();
    expect(incorrectAnswer_2).toBeInTheDocument();
    expect(gravatarImg).toBeInTheDocument();
    expect(categorySecondQuestion).toBeInTheDocument();

    await waitFor(() => {
      expect(incorrectAnswer_2).toBeDisabled()
    }, { timeout: 32000 }
    )

    const nextBtn2 = await screen.findByTestId('btn-next');
    const scoreScreen2 = await screen.findByText('40');
    expect(scoreScreen2).toBeInTheDocument();

    userEvent.click(nextBtn2);

    const thirdQuestion = await screen.findByText('Generally, which component of a computer draws the most power?');
    const correctAnswer_3 = await screen.findByText('Video Card');
    const categoryThirdQuestion = await screen.findByText('Science: Computers');

    expect(currentScore).toBeInTheDocument();
    expect(thirdQuestion).toBeInTheDocument();
    expect(gravatarImg).toBeInTheDocument();
    expect(correctAnswer_3).toBeInTheDocument();
    expect(categoryThirdQuestion).toBeInTheDocument();

    userEvent.click(correctAnswer_3);
    const nextBtn3 = await screen.findByTestId('btn-next');
    const scoreScreen3 = await screen.findByText('110');
    expect(scoreScreen3).toBeInTheDocument();

    userEvent.click(nextBtn3);

    const fourthQuestion = await screen.findByText('What is the most expensive weapon in Counter-Strike: Global Offensive?');
    const incorrectAnswer_4 = await screen.findByText('AWP');
    const categoryFourthQuestion = await screen.findByText('Entertainment: Video Games');

    expect(currentScore).toBeInTheDocument();
    expect(fourthQuestion).toBeInTheDocument();
    expect(incorrectAnswer_4).toBeInTheDocument();
    expect(gravatarImg).toBeInTheDocument();
    expect(categoryFourthQuestion).toBeInTheDocument();
    
    userEvent.click(incorrectAnswer_4);
    const nextBtn4 = await screen.findByTestId('btn-next');
    const scoreScreen4 = await screen.findByText('110');
    expect(scoreScreen4).toBeInTheDocument();

    userEvent.click(nextBtn4);

    const fifthQuestion = await screen.findByText('Who was the Author of the manga Uzumaki?');
    const correctAnswer_5 = await screen.findByText('Junji Ito');
    const categoryFifthQuestion = await screen.findByText('Entertainment: Japanese Anime & Manga');

    expect(currentScore).toBeInTheDocument();
    expect(fifthQuestion).toBeInTheDocument();
    expect(gravatarImg).toBeInTheDocument();
    expect(correctAnswer_5).toBeInTheDocument();
    expect(categoryFifthQuestion).toBeInTheDocument();

    userEvent.click(correctAnswer_5);
    const nextBtn5 = await screen.findByTestId('btn-next');
    const scoreScreen5 = await screen.findByText('210');
    expect(scoreScreen5).toBeInTheDocument();

    userEvent.click(nextBtn5);
    const messageFeedback = await screen.findByText('Well Done!');
    const messageResults = await screen.findByText('Check your result below.');
    const numberOfHits = await screen.findByTestId('feedback-total-question');
    const score = await screen.findByTestId('feedback-total-score');
    const scoreText = await screen.findByText('Score:');
    const messageLog = await screen.findByText('You are logged in as:');
    const user = await screen.findByText('alguem');
    const buttonPlayAgain = await screen.findByRole('button', { name: /play again/i});
    const gravatarImgFeedback = await screen.findByRole('img', { name: /gravatar/i})

    expect(messageFeedback).toBeInTheDocument();
    expect(messageLog).toBeInTheDocument();
    expect(user).toBeInTheDocument();
    expect(scoreText).toBeInTheDocument();
    expect(messageResults).toBeInTheDocument();
    expect(numberOfHits).toHaveTextContent('3')
    expect(score).toHaveTextContent('210');
    expect(buttonPlayAgain).toBeInTheDocument();
    expect(gravatarImgFeedback).toBeInTheDocument();


    userEvent.click(buttonPlayAgain);
    expect(history.location.pathname).toBe('/')


    const welcomeToTrivia = await screen.findByRole('heading', { name: /welcome to trivia/i});

    expect(welcomeToTrivia).toBeInTheDocument();

    history.push('/feedback');
    const buttonRaking = await screen.findByRole('button', { name: /ranking/i});
    expect(buttonRaking).toBeInTheDocument();
    userEvent.click(buttonRaking);
    expect(history.location.pathname).toBe('/ranking')

    const rankingH1 = await screen.findByRole('heading', { name: /ranking/i});
    const userName = await screen.findByText('alguem');
    const finalScore = await screen.findByText('210');
    const gravatarImgRanking = await screen.findByRole('img', { name: /alguem/i});
    const btnGoHome = await screen.findByRole('button', { name: /go home/i})

    expect(rankingH1).toBeInTheDocument();
    expect(userName).toBeInTheDocument();
    expect(finalScore).toBeInTheDocument();
    expect(gravatarImgRanking).toBeInTheDocument();
    expect(btnGoHome).toBeInTheDocument();

    userEvent.click(btnGoHome);
    const playBtn = await screen.findByRole('button', { name: /play/i})
    expect(playBtn).toBeInTheDocument();
  });
})
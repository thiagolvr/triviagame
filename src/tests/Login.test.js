 import { screen, fireEvent, waitFor } from '@testing-library/react';
 import React from 'react';
 import Login from '../pages/Login';
 import App from '../App';
 import userEvent from '@testing-library/user-event';
 import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
 
 describe('Testando a página de Login', () => {
   test('Testa se os inputs de email e senha são renderizados na tela de Login', () => {
     renderWithRouterAndRedux(<Login />);
     const imputEmail = screen.getByTestId('input-gravatar-email');
     const imputName = screen.getByTestId('input-player-name');
     expect(imputEmail).toBeInTheDocument();
     expect(imputName).toBeInTheDocument();
   })
   test('Testa se existem os botões de configurações e o de play na tela de login', () => {
     renderWithRouterAndRedux(<Login />);
     const playButton = screen.getByRole('button', { name: 'Play' });
     const settingsButton = screen.getByRole('button', { name: 'Settings' });
     expect(playButton).toBeInTheDocument();
     expect(settingsButton).toBeInTheDocument();
   })
  test('Testa se  o botão está desabilitado caso um dos campos não esteja preenchido', () => {
     renderWithRouterAndRedux(<Login />);
     const imputEmail = screen.getByTestId('input-gravatar-email');
     const imputName = screen.getByTestId('input-player-name');
     const playButton = screen.getByRole('button', { name: 'Play' });
     
     expect(imputEmail).toHaveTextContent('');
     expect(imputName).toHaveTextContent('');
     expect(playButton).toBeDisabled();  
     
     userEvent.type(imputEmail, 'alguem@email.com');
     expect(playButton).toBeDisabled();
  })
  
  test('Testa se  o botão está habilitado caso um dos campos esteja preenchido', () => {
    renderWithRouterAndRedux(<Login />);
    const imputEmail = screen.getByTestId('input-gravatar-email');
    const imputName = screen.getByTestId('input-player-name');
    const playButton = screen.getByRole('button', { name: 'Play' });
    
    userEvent.type(imputEmail, 'alguem@email.com');
    userEvent.type(imputName, 'alguem');
    expect(playButton).toBeEnabled();  
 })
test('Testa se ao clicar no botão play é redirecionado para rota /game', async () => {
     renderWithRouterAndRedux(<App />);
     const playButton = screen.getByRole('button', { name: 'Play' });
     userEvent.type(screen.getByTestId('input-gravatar-email'), 'alguem@email.com');
     userEvent.type(screen.getByTestId('input-player-name'), 'alguem');
     fireEvent.click(playButton);
     
     await waitFor(() => 
      expect(screen.getByText('alguem')).toBeInTheDocument(),
      { timeout: 5000 }
     );
   })
   test('Testa se ao clicar no botão settings é redirecionado para rota /settings', () => {
     renderWithRouterAndRedux(<App />);
     const settingsButton = screen.getByRole('button', { name: 'Settings' });
     fireEvent.click(settingsButton);
     const settingsHeading = screen.getByRole('heading', { name: /settings/i})
      expect(settingsHeading).toBeInTheDocument();
   });

//   test('Testa se o localStorage é chamado', () => {
//     renderWithRouterAndRedux(<App />)
//     userEvent.type(screen.getByTestId('input-gravatar-email'), 'algum@email.com');
//     userEvent.type(screen.getByTestId('input-player-name'), 'alguem');
//     const playButton = screen.getByRole('button', { name: /play/i });
//     fireEvent.click(playButton)
//     expect(localStorage.getItem).

//     expect(localStorage.getItem).toHaveBeenCalledWith('code');
//   })
})
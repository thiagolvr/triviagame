import { fetchAPI, fetchTrivia } from '../services/triviaAPI';

const setToken = async () => {
  const token = await fetchAPI();
  const { code } = await fetchTrivia(token);
  localStorage.setItem('token', token);
  localStorage.setItem('code', code);
};

export default setToken;

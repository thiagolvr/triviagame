export const fetchAPI = async () => {
  const endpoint1 = 'https://opentdb.com/api_token.php?command=request';
  try {
    const response = await fetch(endpoint1);
    const { token } = await response.json();
    return token;
  } catch (error) {
    console.log(error);
  }
};

export const setToken = async () => {
  const token = await fetchAPI();
  localStorage.setItem('token', token);
};

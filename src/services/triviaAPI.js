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

export const fetchTrivia = async (token) => {
  const endpoint1 = `https://opentdb.com/api.php?amount=5&token=${token}`;
  try {
    const response = await fetch(endpoint1);
    const { results, response_code: code } = await response.json();
    const questions = results.map((question, index) => ({ ...question, id: index }));
    return { questions, code };
  } catch (error) {
    console.log(error);
  }
};

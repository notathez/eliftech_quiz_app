const API_URL = 'http://localhost:5000/api';

const fetchWrapper = async (url, options = {}) => {
  const response = await fetch(url, options);
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      `Error ${response.status}: ${errorData.message || 'Something went wrong'}`,
    );
  }
  return response.json();
};

// QUIZZES
export const getQuizzes = () => fetchWrapper(`${API_URL}/quizzes`);

export const getQuizById = (id) => fetchWrapper(`${API_URL}/quizzes/${id}`);

export const createQuiz = (quiz) =>
  fetchWrapper(`${API_URL}/quizzes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(quiz),
  });

export const updateQuizById = (quizId, quizData) =>
  fetchWrapper(`${API_URL}/quizzes/${quizId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(quizData),
  });

export const deleteQuiz = (quizId) =>
  fetchWrapper(`${API_URL}/quizzes/${quizId}`, {
    method: 'DELETE',
  });

// RESPONSES
export const getResponses = () => fetchWrapper(`${API_URL}/responses`);

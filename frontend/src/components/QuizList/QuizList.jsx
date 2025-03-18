import { useEffect, useState } from 'react';
import { QuizListItem } from '../QuizListItem/QuizListItem';
import { getQuizzes, getResponses, deleteQuiz } from '../../services/api';
import styles from './quizList.module.css';

export const QuizList = ({ sortCriteria }) => {
  const [quizzes, setQuizzes] = useState([]);
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      const quizData = await getQuizzes();
      setQuizzes(quizData);
    };
    const fetchResponses = async () => {
      const responseData = await getResponses();
      setResponses(responseData);
    };

    fetchQuizzes();
    fetchResponses();
  }, []);

  const handleDeleteQuiz = async (id) => {
    try {
      await deleteQuiz(id);
      setQuizzes((prev) => prev.filter((quiz) => quiz._id !== id));
    } catch (error) {
      console.error('Error deleting quiz:', error);
    }
  };

  const sortQuizzes = (quizzes) => {
    return quizzes.sort((a, b) => {
      if (sortCriteria === 'nameA') {
        return a.title.localeCompare(b.title);
      } else if (sortCriteria === 'nameZ') {
        return b.title.localeCompare(a.title);
      } else if (sortCriteria === 'questionsL') {
        return a.questions.length - b.questions.length;
      } else if (sortCriteria === 'questionsH') {
        return b.questions.length - a.questions.length;
      } else if (sortCriteria === 'completionsL') {
        const aCompletions = responses.filter(
          (response) => response.quizId === a._id,
        ).length;
        const bCompletions = responses.filter(
          (response) => response.quizId === b._id,
        ).length;
        return aCompletions - bCompletions;
      } else if (sortCriteria === 'completionsH') {
        const aCompletions = responses.filter(
          (response) => response.quizId === a._id,
        ).length;
        const bCompletions = responses.filter(
          (response) => response.quizId === b._id,
        ).length;
        return bCompletions - aCompletions;
      }
      return 0;
    });
  };

  const sortedQuizzes = sortQuizzes(quizzes);

  return (
    <div className="container">
      <div className={styles.quizList}>
        {sortedQuizzes.map((quiz) => (
          <QuizListItem
            key={quiz._id}
            data={quiz}
            onDelete={handleDeleteQuiz}
            responses={responses.filter(
              (response) => response.quizId === quiz._id,
            )}
          />
        ))}
      </div>
    </div>
  );
};

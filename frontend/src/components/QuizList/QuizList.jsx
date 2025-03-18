import { useEffect, useState } from 'react';
import { QuizListItem } from '../QuizListItem/QuizListItem';
import { getQuizzes } from '../../services/api';
import styles from './quizList.module.css';

export const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      const data = await getQuizzes();
      setQuizzes(data);
    };
    fetchQuizzes();
  }, []);

  const handleDeleteQuiz = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/quizzes/${id}`, {
        method: 'DELETE',
      });
      setQuizzes((prev) => prev.filter((quiz) => quiz._id !== id));
    } catch (error) {
      console.error('Error deleting quiz:', error);
    }
  };

  return (
    <div className="container">
      <div className={styles.quizList}>
        {quizzes.map((quiz) => (
          <QuizListItem
            key={quiz._id}
            data={quiz}
            onDelete={handleDeleteQuiz}
          />
        ))}
      </div>
    </div>
  );
};

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './quizListItem.module.css';
import { DropDown } from '../DropDown/DropDown';
import { getResponses } from '../../services/api';

export const QuizListItem = ({ data, onDelete }) => {
  const navigate = useNavigate();
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    const fetchResponses = async () => {
      const data = await getResponses();
      setResponses(data);
    };
    fetchResponses();
  }, []);

  const quizResponses = responses.filter(
    (response) => response.quizId === data._id,
  );
  const completionsCount = quizResponses.length;

  return (
    <div className={styles.quizItem}>
      <div className={styles.header}>
        <h2
          className={styles.quizName}
          onClick={() => navigate(`/quiz/${data._id}`)}
        >
          {data.title}
        </h2>
        <DropDown quizId={data._id} onDelete={onDelete} />
      </div>
      <p className={styles.quizDescription}>{data.description}</p>
      <div className={styles.quizStats}>
        <p>
          Number of questions: <span>{data.questions.length}</span>
        </p>
        <p>
          Number of completions: <span>{completionsCount}</span>
        </p>
      </div>
      <small className={styles.quizData}>{data.dateCreated}</small>
    </div>
  );
};

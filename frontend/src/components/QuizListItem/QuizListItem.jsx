import { useNavigate } from 'react-router-dom';
import styles from './quizListItem.module.css';
import { DropDown } from '../DropDown/DropDown';

export const QuizListItem = ({ data, onDelete, responses }) => {
  const navigate = useNavigate();

  const date = new Date(data.createdAt);
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  const formattedDate = date.toLocaleDateString('en-GB', options);

  const completionsCount = responses.length;

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
      <small className={styles.quizData}>{formattedDate}</small>
    </div>
  );
};

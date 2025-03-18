// components/QuizForm.jsx
import { QuizFormItem } from '../QuizFormItem/QuizFormItem';
import styles from './quizFormList.module.css';

export const QuizFormList = ({
  questions,
  answers,
  onAnswerChange,
  onCheckboxChange,
}) => {
  return (
    <div className={styles.quizFormList}>
      {questions.map((question) => (
        <QuizFormItem
          key={question._id}
          question={question}
          answers={answers}
          onAnswerChange={onAnswerChange}
          onCheckboxChange={onCheckboxChange}
        />
      ))}
    </div>
  );
};

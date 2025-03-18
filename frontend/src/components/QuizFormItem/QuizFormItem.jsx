import styles from './quizFormItem.module.css';

export const QuizFormItem = ({
  question,
  answers,
  onAnswerChange,
  onCheckboxChange,
}) => {
  const userAnswer = answers.find(
    (answer) => answer.questionId === question._id,
  );

  return (
    <div className={styles.quizFormItem}>
      <p>{question.question}</p>

      {question.type === 'Text' && (
        <div className={styles.quizAnswersItem}>
          <input
            type="text"
            placeholder="Your answer"
            onChange={(e) => onAnswerChange(question._id, e.target.value)}
          />
        </div>
      )}

      {question.type === 'Single choice' && (
        <div className={styles.answersList}>
          <ol className={styles.quizAnswers}>
            {question.answers.map((answer, index) => (
              <li key={index} className={styles.quizAnswersItem}>
                <label>
                  <input
                    type="radio"
                    name={question._id}
                    value={answer}
                    checked={userAnswer?.answer === answer}
                    onChange={() => onAnswerChange(question._id, answer)}
                  />
                  {answer}
                </label>
              </li>
            ))}
          </ol>
        </div>
      )}

      {question.type === 'Multiple choice' && (
        <div className={styles.answersList}>
          <ol className={styles.quizAnswers}>
            {question.answers.map((answer, index) => (
              <li key={index} className={styles.quizAnswersItem}>
                <label>
                  <input
                    type="checkbox"
                    checked={userAnswer?.answer[index] === 'true'}
                    onChange={(e) =>
                      onCheckboxChange(
                        question._id,
                        answer,
                        e.target.checked,
                        question.answers,
                      )
                    }
                  />
                  {answer}
                </label>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
};

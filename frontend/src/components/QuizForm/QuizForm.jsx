import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getQuizById } from '../../services/api';

import { QuizFormList } from '../QuizFormList/QuizFormList';
import styles from './quizForm.module.css';

export const QuizForm = () => {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [isStarted, setIsStarted] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [score, setScore] = useState(null);
  const [intervalId, setIntervalId] = useState(null);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const fetchQuiz = async () => {
      const data = await getQuizById(id);
      setQuiz(data);
    };
    fetchQuiz();
  }, [id]);

  const startQuiz = () => {
    setIsStarted(true);

    const newIntervalId = setInterval(() => {
      setSecondsElapsed((prevTime) => prevTime + 1);
    }, 1000);

    setIntervalId(newIntervalId);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes} m ${formattedSeconds} s`;
  };

  const handleFinish = async () => {
    clearInterval(intervalId);

    let correctAnswers = 0;
    quiz.questions.forEach((question) => {
      const userAnswer = answers.find(
        (answer) => answer.questionId === question._id,
      );
      if (userAnswer) {
        const isCorrect = checkAnswer(question, userAnswer.answer);
        if (isCorrect) correctAnswers++;
      }
    });

    setScore(correctAnswers);
    setIsFinished(true);

    try {
      const response = await fetch(
        'http://localhost:5000/api/responses/submit',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            quizId: quiz._id,
            answers,
            timeSpent: secondsElapsed,
          }),
        },
      );

      if (!response.ok) {
        throw new Error('Error saving answer');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const checkAnswer = (question, answer) => {
    const correctAnswers = Array.isArray(question.correctAnswers)
      ? question.correctAnswers
      : [question.correctAnswers];

    if (question.type === 'Text') {
      return (
        String(answer).trim().toLowerCase() ===
        correctAnswers[0].trim().toLowerCase()
      );
    }

    if (question.type === 'Single choice') {
      const userAnswer = new Array(question.answers.length).fill('false');
      const answerIndex = question.answers.indexOf(answer);
      if (answerIndex !== -1) {
        userAnswer[answerIndex] = 'true';
      }

      return JSON.stringify(userAnswer) === JSON.stringify(correctAnswers);
    }

    if (question.type === 'Multiple choice') {
      const userAnswers = Array.isArray(answer) ? answer : [answer];

      if (userAnswers.length !== correctAnswers.length) {
        return false;
      }

      return correctAnswers.every((correctAnswer, index) => {
        return correctAnswer === userAnswers[index];
      });
    }

    return false;
  };

  if (!quiz) return <p>Loading...</p>;

  return (
    <div className="container">
      <div className={styles.quizForm}>
        <div className={styles.quizFormHeader}>
          <h2>{quiz.title}</h2>
          <p>{quiz.description}</p>
        </div>

        <div className={styles.quizFormBody}>
          {!isFinished && isStarted ? (
            <div className={styles.quizFormQuestions}>
              <p className={styles.time}>
                Time elapsed: {Math.floor(secondsElapsed / 60)}:
                {secondsElapsed % 60}
              </p>
              <QuizFormList
                questions={quiz.questions}
                answers={answers}
                onAnswerChange={(questionId, answer) =>
                  setAnswers((prevAnswers) => {
                    const updatedAnswers = prevAnswers.filter(
                      (item) => item.questionId !== questionId,
                    );
                    return [...updatedAnswers, { questionId, answer }];
                  })
                }
                onCheckboxChange={(
                  questionId,
                  answer,
                  isChecked,
                  answersList,
                ) =>
                  setAnswers((prevAnswers) => {
                    const existingAnswer = prevAnswers.find(
                      (item) => item.questionId === questionId,
                    );

                    let updatedAnswers = existingAnswer
                      ? [...existingAnswer.answer]
                      : new Array(answersList.length).fill('false');

                    const answerIndex = answersList.indexOf(answer);

                    updatedAnswers[answerIndex] = isChecked ? 'true' : 'false';

                    const filteredAnswers = prevAnswers.filter(
                      (item) => item.questionId !== questionId,
                    );

                    return [
                      ...filteredAnswers,
                      { questionId, answer: updatedAnswers },
                    ];
                  })
                }
              />
              <button className={styles.buttonAction} onClick={handleFinish}>
                Finish
              </button>
            </div>
          ) : (
            !isStarted && (
              <button className={styles.buttonAction} onClick={startQuiz}>
                Start
              </button>
            )
          )}
        </div>

        {score !== null && (
          <div className={styles.quizFormFooter}>
            <h3>
              Your score: {score} / {quiz.questions.length}
            </h3>
            <h4>Time spent: {formatTime(secondsElapsed)}</h4>
            <ul>
              {quiz.questions.map((question) => {
                const userAnswer = answers.find(
                  (answer) => answer.questionId === question._id,
                );
                const isCorrect = checkAnswer(question, userAnswer?.answer);

                return (
                  <li
                    key={question._id}
                    className={
                      isCorrect ? styles.correctAnswer : styles.incorrectAnswer
                    }
                  >
                    <p>
                      <strong>Q:</strong> {question.question}
                    </p>
                    <p>
                      <strong>Your answer:</strong>{' '}
                      {userAnswer?.answer || 'No answer'}
                    </p>
                    <p>
                      <strong>Correct answer:</strong> {question.correctAnswer}
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

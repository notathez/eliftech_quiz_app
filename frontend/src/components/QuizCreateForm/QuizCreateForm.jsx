import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createQuiz, updateQuizById } from '../../services/api';
import { QuizCreateFormQuestion } from '../QuizCreateFormQuestion/QuizCreateFormQuestion';
import styles from './quizCreateForm.module.css';

export const QuizCreateForm = ({ initialData = null, onSave }) => {
  const [quiz, setQuiz] = useState({
    title: '',
    description: '',
    questions: [],
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (!initialData) {
      const savedQuiz = localStorage.getItem('quiz');
      if (savedQuiz) {
        setQuiz(JSON.parse(savedQuiz));
      }
    } else {
      setQuiz(initialData);
    }
  }, [initialData]);

  useEffect(() => {
    if (
      quiz.title !== '' ||
      quiz.description !== '' ||
      quiz.questions.length > 0
    ) {
      localStorage.setItem('quiz', JSON.stringify(quiz));
    }
  }, [quiz]);

  const handleAddQuestion = () => {
    setQuiz((prevQuiz) => ({
      ...prevQuiz,
      questions: [
        ...prevQuiz.questions,
        {
          id: Date.now(),
          question: '',
          answers: [],
          correctAnswers: [],
          type: 'Multiple choice',
        },
      ],
    }));
  };

  const handleChangeQuizData = (field, value) => {
    setQuiz((prevQuiz) => ({ ...prevQuiz, [field]: value }));
  };

  const validateQuiz = () => {
    return (
      quiz.title &&
      quiz.description &&
      quiz.questions.length > 0 &&
      quiz.questions.every(
        (q) =>
          q.question &&
          (q.type === 'Text'
            ? q.correctAnswers.length > 0
            : q.answers.length > 0),
      )
    );
  };

  const checkDuplicateAnswers = () => {
    return quiz.questions.some((question) => {
      const uniqueAnswers = new Set(question.answers);
      return question.answers.length !== uniqueAnswers.size;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateQuiz()) {
      alert(
        'Please provide a quiz name, description, and at least one question with answers.',
      );
      return;
    }

    if (checkDuplicateAnswers()) {
      alert('Some answers are duplicated. Please check the answers.');
      return;
    }

    const formattedQuiz = {
      ...quiz,
      questions: quiz.questions.map(({ id, ...rest }) => rest),
    };

    try {
      if (initialData) {
        await updateQuizById(initialData._id, formattedQuiz);
        alert('Quiz updated successfully!');
      } else {
        await createQuiz(formattedQuiz);
        alert('Quiz created successfully!');
      }
      if (onSave) onSave(formattedQuiz);
    } catch (error) {
      console.error('Error saving quiz:', error);
    }

    localStorage.removeItem('quiz');
    navigate('/');
  };

  return (
    <div className="container">
      <form className={styles.quizCreateForm} onSubmit={handleSubmit}>
        <div className={styles.quizCreateFormHeader}>
          <h2>{initialData ? 'Edit your quiz' : 'Create your own quiz'}</h2>
          <button type="submit" disabled={!validateQuiz()}>
            {initialData ? 'Save changes' : 'Save'}
          </button>
        </div>

        <div className={styles.quizData}>
          <label htmlFor="quiz-name">Quiz name</label>
          <input
            type="text"
            name="quiz-name"
            id="quiz-name"
            value={quiz.title}
            onChange={(e) => handleChangeQuizData('title', e.target.value)}
          />
        </div>

        <div className={styles.quizData}>
          <label htmlFor="quiz-description">Quiz description</label>
          <textarea
            name="quiz-description"
            id="quiz-description"
            rows={3}
            value={quiz.description}
            onChange={(e) =>
              handleChangeQuizData('description', e.target.value)
            }
          />
        </div>

        <ol className={styles.quizQuestions}>
          {quiz.questions.map((question, index) => (
            <QuizCreateFormQuestion
              key={index}
              question={question}
              questionIndex={index}
              setQuiz={setQuiz}
              quiz={quiz}
            />
          ))}
        </ol>

        <button
          type="button"
          className={styles.addQuestionAnswer}
          onClick={handleAddQuestion}
        >
          Add Question
        </button>
      </form>
    </div>
  );
};

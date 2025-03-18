import { Trash2, Plus, ChevronDown } from 'lucide-react';
import { useState, useCallback } from 'react';
import styles from './quizCreateFormQuestion.module.css';

export const QuizCreateFormQuestion = ({
  question,
  questionIndex,
  setQuiz,
  quiz,
}) => {
  const [isBodyVisible, setIsBodyVisible] = useState(true);

  const updateQuiz = useCallback(
    (updatedQuestions) => {
      setQuiz((prevQuiz) => ({ ...prevQuiz, questions: updatedQuestions }));
    },
    [setQuiz],
  );

  const handleAddAnswer = () => {
    if (question.type === 'Text') return;

    const updatedQuestions = [...quiz.questions];
    const uniqueAnswers = new Set(question.answers);

    if (question.answers.length === uniqueAnswers.size) {
      updatedQuestions[questionIndex] = {
        ...updatedQuestions[questionIndex],
        answers: [...question.answers, ''],
        correctAnswers: [...question.correctAnswers, false],
      };
      updateQuiz(updatedQuestions);
    }
  };

  const handleChange = (e, type) => {
    const updatedQuestions = [...quiz.questions];
    updatedQuestions[questionIndex][type] = e.target.value;

    if (type === 'question') updateQuiz(updatedQuestions);
  };

  const handleDeleteAnswer = (answerIndex) => {
    const updatedQuestions = [...quiz.questions];
    const updatedAnswers = question.answers.filter((_, i) => i !== answerIndex);
    let updatedCorrectAnswers = question.correctAnswers.filter(
      (_, i) => i !== answerIndex,
    );

    if (
      question.type === 'Single choice' &&
      updatedCorrectAnswers.length === 0
    ) {
      updatedCorrectAnswers = [false];
    }

    updatedQuestions[questionIndex] = {
      ...updatedQuestions[questionIndex],
      answers: updatedAnswers,
      correctAnswers: updatedCorrectAnswers,
    };
    updateQuiz(updatedQuestions);
  };

  const handleAnswerChange = (answerIndex, e) => {
    const updatedQuestions = [...quiz.questions];
    updatedQuestions[questionIndex].answers[answerIndex] = e.target.value;
    updateQuiz(updatedQuestions);
  };

  const handleCorrectAnswerToggle = (answerIndex) => {
    const updatedQuestions = [...quiz.questions];
    const updatedCorrectAnswers = [...question.correctAnswers];
    updatedCorrectAnswers[answerIndex] = !updatedCorrectAnswers[answerIndex];

    if (question.type === 'Single choice') {
      updatedQuestions[questionIndex].correctAnswers =
        updatedCorrectAnswers.map(() => false);
      updatedQuestions[questionIndex].correctAnswers[answerIndex] = true;
    } else {
      updatedQuestions[questionIndex].correctAnswers = updatedCorrectAnswers;
    }
    updateQuiz(updatedQuestions);
  };

  const handleTextCorrectAnswerChange = (e) => {
    const updatedQuestions = [...quiz.questions];
    updatedQuestions[questionIndex].correctAnswers = [e.target.value];
    updateQuiz(updatedQuestions);
  };

  const handleDeleteQuestion = () => {
    const updatedQuestions = quiz.questions.filter(
      (_, index) => index !== questionIndex,
    );
    updateQuiz(updatedQuestions);
  };

  const toggleBodyVisibility = () => setIsBodyVisible((prev) => !prev);

  return (
    <li className={styles.quizQuestionsItem}>
      <div className={styles.quizQuestionItemHeader}>
        <p>
          <ChevronDown
            onClick={toggleBodyVisibility}
            style={{
              transform: isBodyVisible ? 'rotate(0deg)' : 'rotate(-90deg)',
              transition: 'transform 0.3s ease',
            }}
          />
          Question <span>{questionIndex + 1}</span>
        </p>
        <select
          className={styles.answerTypeSelect}
          value={question.type}
          onChange={(e) => handleChange(e, 'type')}
        >
          <option value="Multiple choice">Multiple choice</option>
          <option value="Text">Text</option>
          <option value="Single choice">Single choice</option>
        </select>

        <Trash2
          onClick={handleDeleteQuestion}
          className={styles.deleteQuestionIcon}
        />
      </div>

      {isBodyVisible && (
        <div className={styles.quizQuestionItemBody}>
          <textarea
            placeholder="Enter your question..."
            rows={4}
            value={question.question}
            onChange={(e) => handleChange(e, 'question')}
          />
          <p>
            Choices<span>*</span>
          </p>
          {question.type === 'Text' ? (
            <textarea
              placeholder="Enter correct answer..."
              value={question.correctAnswers[0] || ''}
              onChange={handleTextCorrectAnswerChange}
              className={styles.textAnswerArea}
            />
          ) : (
            <ol className={styles.quizAnswers}>
              {question.answers.map((answer, index) => (
                <li key={index} className={styles.quizAnswersItem}>
                  {['Single choice', 'Multiple choice'].includes(
                    question.type,
                  ) && (
                    <input
                      type={
                        question.type === 'Single choice' ? 'radio' : 'checkbox'
                      }
                      name={`choice-${questionIndex}`}
                      checked={
                        question.correctAnswers[index] === 'true' ||
                        question.correctAnswers[index] === true
                      }
                      onChange={() => handleCorrectAnswerToggle(index)}
                    />
                  )}
                  <input
                    type="text"
                    value={answer}
                    onChange={(e) => handleAnswerChange(index, e)}
                    placeholder="Enter answer..."
                  />
                  <Trash2 onClick={() => handleDeleteAnswer(index)} />
                </li>
              ))}
            </ol>
          )}

          {question.type !== 'Text' && (
            <button
              className={styles.addFormAnswer}
              type="button"
              onClick={handleAddAnswer}
            >
              <Plus /> Add Answer
            </button>
          )}
        </div>
      )}
    </li>
  );
};

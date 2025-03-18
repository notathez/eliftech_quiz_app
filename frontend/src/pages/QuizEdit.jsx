import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getQuizById, updateQuizById } from '../services/api';
import { QuizCreateForm } from '../components/QuizCreateForm/QuizCreateForm';
import { Header } from '../components/Header/Header';

export default function QuizEdit() {
  const { quizId } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setError(null);
        setIsLoading(true);
        const data = await getQuizById(quizId);
        setQuiz(data);
      } catch (err) {
        console.error('Error fetching quiz:', err);
        setError(`Failed to load quiz: ${err.message}`);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [quizId]);

  const handleSave = async (updatedQuiz) => {
    try {
      await updateQuizById(quizId, updatedQuiz);
      alert('Quiz updated successfully!');
    } catch (err) {
      console.error('Error updating quiz:', err);
      setError(`Failed to update quiz: ${err.message}`);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div>
      <Header />
      <QuizCreateForm initialData={quiz} onSave={handleSave} />
    </div>
  );
}

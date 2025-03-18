import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Catalog from './pages/Catalog';
import Quiz from './pages/Quiz';
import QuizCreator from './pages/QuizCreator';
import QuizEdit from './pages/QuizEdit';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Catalog />} />
        <Route path="/quiz/:id" element={<Quiz />} />
        <Route path="/quiz/:quizId/edit" element={<QuizEdit />} />
        <Route path="/create" element={<QuizCreator />} />
      </Routes>
    </Router>
  );
}

export default App;

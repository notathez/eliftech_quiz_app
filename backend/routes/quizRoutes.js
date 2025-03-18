const express = require('express');
const { getAllQuizzes, createQuiz, getQuizById, deleteQuiz, updateQuiz } = require('../controllers/quizController');

const router = express.Router();

router.get('/', getAllQuizzes); 
router.post('/', createQuiz);
router.get('/:id', getQuizById); 
router.delete('/:id', deleteQuiz);
router.put('/:id', updateQuiz);

module.exports = router;

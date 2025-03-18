const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  questions: [
    {
      question: { type: String, required: true },
      type: { 
        type: String, 
        enum: ['Multiple choice', 'Text', 'Single choice'],
        required: true
      },
      answers: [String],
      correctAnswers: [String],
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz;

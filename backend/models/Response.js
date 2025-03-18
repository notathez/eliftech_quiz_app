const mongoose = require('mongoose');

const responseSchema = new mongoose.Schema({
  quizId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true },
  answers: [
    {
      question: { type: String },
      answer: { type: mongoose.Schema.Types.Mixed }, 
    },
  ],
  timeSpent: { type: Number, required: true }, 
  submittedAt: { type: Date, default: Date.now },
});

const Response = mongoose.model('Response', responseSchema);

module.exports = Response;

const Response = require('../models/Response'); 

const getAllResponses = async (req, res) => {
  try {
    const responses = await Response.find();
    res.status(200).json(responses);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching quizzes', error });
  }
};

const submitResponse = async (req, res) => {
  try {
    const { quizId, answers, timeSpent } = req.body;
    
    const newResponse = new Response({
      quizId,
      answers,
      timeSpent,
      createdAt: new Date(),
    });

    await newResponse.save();

    res.status(201).json({ message: 'Answer was successfully saved', data: newResponse });
  } catch (error) {
    console.error('Error saving answer:', error);
    res.status(500).json({ message: 'Error saving answer' });
  }
};

module.exports = { submitResponse, getAllResponses };

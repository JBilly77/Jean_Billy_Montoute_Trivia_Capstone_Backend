import express from 'express';
import quizzes from '../models/quizzes.js';
import Question from '../models/questions.js';

//Creating an Express router
const quizRouter = express.Router();

quizRouter.post('/', async (req, res) => {
  try {
    const quiz = new quizzes({ title: req.body.title });
    await quiz.save();
    res.json(quiz);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating quiz' });
  }
});

quizRouter.get('/:id', async (req, res) => {
  try {
    const quiz = await quizzes.findById(req.params.id).populate('questions').exec();
    res.json(quiz);
  } catch (err) {
    console.error(err);
    res.status(404).json({ message: 'Quiz not found' });
  }
});

quizRouter.patch('/:id', async (req, res) => {
  try {
    const quiz = await quizzes.findByIdAndUpdate(req.params.id, { $addToSet: { questions: req.body.questionId } }, { new: true }).exec();
    res.json(quiz);
  } catch (err) {
    console.error(err);
    res.status(404).json({ message: 'Quiz not found' });
  }
});

export default quizRouter;
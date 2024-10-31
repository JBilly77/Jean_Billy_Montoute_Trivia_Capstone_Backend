import express from 'express';
import router from express.Router();
import quizzes from '../models/quizzes';
import Question from '../models/Question';

router.post('/', async (req, res) => {
  try {
    const quiz = new quizzes({ title: req.body.title });
    await quiz.save();
    res.json(quiz);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating quiz' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const quiz = await quizzes.findById(req.params.id).populate('questions').exec();
    res.json(quiz);
  } catch (err) {
    console.error(err);
    res.status(404).json({ message: 'Quiz not found' });
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const quiz = await quizzes.findByIdAndUpdate(req.params.id, { $addToSet: { questions: req.body.questionId } }, { new: true }).exec();
    res.json(quiz);
  } catch (err) {
    console.error(err);
    res.status(404).json({ message: 'Quiz not found' });
  }
});

export default quizRouter;
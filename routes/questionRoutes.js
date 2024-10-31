import express from 'express';
import router from express.Router();
import Question from '../models/Question';
import axios from 'axios';

router.get('/', async (req, res) => {
  try {
    const questions = await Question.find().exec();
    res.json(questions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching questions' });
  }
});

router.post('/fetch', async (req, res) => {
  try {
    const apiResponse = await axios.get(`https://quizapi.io/api/v1/questions?apiKey=${process.env.API_KEY}&limit=10`);
    const questions = apiResponse.data;
    questions.forEach(async (question) => {
      await Question.findOneAndUpdate(
        { question: question.question },
        { $set: question },
        { upsert: true, new: true }
      ).exec();
    });
    res.json({ message: 'Questions fetched successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching questions' });
  }
});

export default questionRouter;
import express from 'express';
import User from '../models/users.js';
import quizzes from '../models/quizzes.js';

//Creating an Express router
const userRouter = express.Router();

//Create users
userRouter.post('/', async (req, res) => {
  try {
    const user = new User({ name: req.body.name, email: req.body.email });
    await user.save();
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating user' });
  }
});

//Retrieve users by ID
userRouter.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('quizzes').exec();
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(404).json({ message: 'User not found' });
  }
});

//Update users
userRouter.patch('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, { $addToSet: { quizzes: req.body.quizId } }, { new: true }).exec();
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(404).json({ message: 'User not found' });
  }
});

export default userRouter;
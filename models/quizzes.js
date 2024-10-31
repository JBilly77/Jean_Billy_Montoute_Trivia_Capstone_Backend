import mongoose, { Schema, Types } from 'mongoose';
import Question from '../models/questions.js';

const quizSchema = new Schema({
  title: String,
  questions: [{ type: Types.ObjectId, ref: 'Question' }],
});

export default mongoose.model('quizzes', quizSchema);
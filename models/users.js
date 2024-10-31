import mongoose, { Schema, Types } from 'mongoose';
import quizzes from './models/quizzes.js';

const userSchema = new Schema({
  name: String,
  email: String,
  quizzes: [{ type: Types.ObjectId, ref: 'quizzes' }],
});

export default mongoose.model('User', userSchema);
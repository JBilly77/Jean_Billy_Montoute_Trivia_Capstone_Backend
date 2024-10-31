import mongoose, { Schema } from 'mongoose';

const questionSchema = new Schema({
  category: String,
  type: String,
  difficulty: String,
  question: String,
  correct_answer: String,
  incorrect_answers: [String],
});

export default mongoose.model('Question', questionSchema);
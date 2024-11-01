import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  id: {
     type: Number, required: true, unique: true 
    },
  question: {
     type: String, required: true 
    },
  description: {
     type: String, required: true 
    },
  answers: {
    answer_a: { type: String },
    answer_b: { type: String },
    answer_c: { type: String },
    answer_d: { type: String }    
  },
  multipleCorrectAnswers: {
     type: Boolean, required: true 
    },
  correctAnswers: {
    answer_a_correct: { type: Boolean, required: true },
    answer_b_correct: { type: Boolean, required: true },
    answer_c_correct: { type: Boolean, required: true },
    answer_d_correct: { type: Boolean, required: true }
  },
  correct_answer: {
    type: String, required: true
  },
  explanation: {
     type: String, required: true 
    },
  tip: {
     type: String 
    },
  tags: [{ type: String }],
  category: { 
    type: String, required: true 
  },
  difficulty: {
     type: String, required: true 
    }
}, 
{
   timestamps: true 
  }
);

const Question = mongoose.model('Question', questionSchema);
export default Question;
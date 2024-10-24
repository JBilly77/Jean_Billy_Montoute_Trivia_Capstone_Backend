import mongoose from 'mongoose';

export const questionsSchema = new mongoose.Schema({
});


const questions = new mongoose.model('questions', questionsSchema);
export default questions;
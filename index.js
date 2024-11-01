import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import questionRouter from './routes/questionRoutes.js';
import quizRouter from './routes/quizRoutes.js';
import userRouter from './routes/userRoutes.js';


dotenv.config();
const app = express();
const PORT = process.env.PORT || 3007;

// ===== Connect to DB ===== //
try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Connected to mongodb`);
} catch (error) {
    console.error(error);  
}

// ===== Middlewares ===== //
app.use(morgan('dev')); // logger
app.use(express.json()); // parse data to the body
app.use(express.urlencoded({extended: true}));
app.use(cors()); // allows backend to talk to frontend in the same machine

//==========ROUTES===========//

app.get('/', (req, res) => {
    res.send('Welcome to my NZ FUN TRIVIA!')
});

app.use('/api/questions', questionRouter);
app.use('/api/quizzes', quizRouter);
app.use('/api/users', userRouter);

// ===== Error Middlewares ===== //
app.use((e, req, res, next) => {
    console.error(e);
    res.status(500).json({message: e.message, error: e });
});


app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
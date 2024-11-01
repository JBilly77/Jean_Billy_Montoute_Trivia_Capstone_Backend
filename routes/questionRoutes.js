//import express from 'express';
import {Router} from 'express'
import Question from '../models/questions.js';
//import axios from 'axios';

//Creating an Express router
const questionRouter = new Router();

//GET Request to all data
questionRouter.get('/', async (req, res, next) => {
  //res.send('Need to fetch the data');
  try {
   const questions = await Question.find();
   if(questions){
    res.json({questions});  
   }else{
    res.json({message: "No questions found!"});
   }

  } catch (error) {
    next(error)
  }
});

/**
 * GET /api/questions/:id
 * @description fetches single question by the id
 */
questionRouter.get("/:id", async (req, res, next) => {
  try {
    const questionid = await Question.findById(req.params.id);

    if (questionid) {
      res.json({ questionid });
    } else {
      res.json({ message: `No question found with this id: ${req.params.id}`});
    }
  } catch (error) {
    next(error);
  }
});

/**
 * POST /api/projects/
 * @description create a new project document
 */
questionRouter.post("/", async (req, res, next) => {
  try {
    console.log(req.body);

    const newQuestions = await Question.create(req.body);

    if (newQuestions) {
      res.status(201).json({ questions: newQuestions });
    } else {
      res.status(400).json({ message: "Error creating new question" });
    }
  } catch (error) {
    next(error);
  }
});

/**
 * PUT /api/projects/:id
 * @description Update a document by the id
 */
questionRouter.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const updateQuestion = await Question.findByIdAndUpdate(id, body, {
      new: true,
    });
    if (updateQuestion) {
      res.json({ updateQuestion });
    } else {
      res.json({ message: `Error updating question: ${req.params.id}` });
    }
  } catch (error) {
    next(error);
  }
});
/**
 * DELETE /api/projects/:id
 */
questionRouter.delete("/:id", async (req, res, next) => {
  try {
    const deleteQuestion = await Question.findByIdAndDelete(req.params.id);

    if (deleteQuestion) {
        res.json({ message: `Question deleted: ${req.params.id}`, deleteQuestion });
    } else {
        res.json({message: `Error deleting question: ${req.params.id}`})
    }

  } catch (error) {
    next(error);
  }
});

// questionRouter.post('/fetch', async (req, res) => {
//   try {
//     const apiResponse = await axios.get(`https://quizapi.io/api/v1/questions?apiKey=${process.env.API_KEY}&limit=10`);
//     const questions = apiResponse.data;
//     questions.forEach(async (question) => {
//       await Question.findOneAndUpdate(
//         { question: question.question },
//         { $set: question },
//         { upsert: true, new: true }
//       ).exec();
//     });
//     res.json({ message: 'Questions fetched successfully' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Error fetching questions' });
//   }
// });

export default questionRouter;
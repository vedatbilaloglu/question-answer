const customError = require("../helpers/error/CustomError");
const asyncErrorWrapper = require("express-async-handler");
const Question = require("../models/Questions");



const askNewQuestion = asyncErrorWrapper(async (req,res,next) => { 

    const information = req.body;

    const question = await Question.create({
        ...information,
        user: req.user.id
    });
    res.status(200)
    .json({
        success: true,
        data: question
    });
});

const getAllQuestions = asyncErrorWrapper(async (req,res,next) => { 

    const question = await Question.find();
 
    return res.status(200)
    .json({
        success: true,
        data: question
    });
 });

const getSingleQuestions = asyncErrorWrapper(async (req,res,next) => { 

    const {id} = req.params;

    const questions = await Question.findById(id);

    return res.status(200)
    .json({
        success: true,
        data : questions
    });
});

const editQuestion = asyncErrorWrapper(async (req,res,next) => { 

    const {id} = req.params; // Question id aldım.

    const {title, content} = req.body; // Düzenlenecek veriyi body içerisinden aldım.

    let question = await Question.findById(id); // Questionı buldum.

    question.title = title; // Title ve Content kısımlarına body'den gelen bilgileri atadım.
    question.content = content;

    question = await question.save(); // Veritabanına kaydettim.

    return res.status(200) // Cevabı dönüş yaptım.
    .json({
        success: true,
        data: question
    });
});

const deleteQuestion = asyncErrorWrapper(async (req,res,next) => { 
    
    const {id} = req.params;

    const question = await Question.findById(id);

    await question.remove();

    return res.status(200)
    .json({
        success: true,
        message: "Question deleted!"
    });

});

 
module.exports = {
    askNewQuestion,
    getAllQuestions,
    getSingleQuestions,
    editQuestion,
    deleteQuestion
}
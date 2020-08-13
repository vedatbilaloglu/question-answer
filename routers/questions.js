
const express = require("express");
const {
    askNewQuestion, 
    getAllQuestions, 
    getSingleQuestions,
    editQuestion,
    deleteQuestion
} = require('../controllers/question');
const {getAccessToRoute, getQuestionOwnerAccess} = require("../middlewares/authorization/auth");
const { checkQuestionExist } = require("../middlewares/database/databaseErrorHelpers");

const router = express.Router();

router.post("/ask", getAccessToRoute,askNewQuestion);
router.get("/", getAllQuestions);
router.get("/:id", checkQuestionExist, getSingleQuestions);
router.put("/:id/edit", 
    [getAccessToRoute, checkQuestionExist, getQuestionOwnerAccess], 
    editQuestion
    );
router.delete("/:id/delete", 
    [getAccessToRoute, checkQuestionExist, getQuestionOwnerAccess], 
    deleteQuestion
    );


module.exports = router;
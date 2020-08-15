const express = require("express");
const { getAccessToRoute } = require("../middlewares/authorization/auth");
const { 
    addNewAnswerToQuestion, 
    getAllAnswer,
    getSingleAnswer,
    editAnswer,
    deleteAnswer,
    likeAnswer,
    undoLikeAnswer 
} = require("../controllers/answer");
const { checkQuestionAndAnswerExist } = require("../middlewares/database/databaseErrorHelpers");
const router = express.Router({mergeParams:true}); // Üst routerın params bilgileri alt routera gelmesi için mergeParams kullandım.
const { getAnswerOwnerAccess } = require("../middlewares/authorization/auth");

router.post("/", getAccessToRoute, addNewAnswerToQuestion);
router.get("/", getAllAnswer);
router.get("/:answer_id", checkQuestionAndAnswerExist ,getSingleAnswer);
router.get("/:answer_id/like", 
[checkQuestionAndAnswerExist, getAccessToRoute], 
likeAnswer);
router.get("/:answer_id/undolike", 
[checkQuestionAndAnswerExist, getAccessToRoute], 
undoLikeAnswer);
router.put("/:answer_id/edit", 
[checkQuestionAndAnswerExist, getAccessToRoute, getAnswerOwnerAccess], 
editAnswer);
router.delete("/:answer_id/delete", 
[checkQuestionAndAnswerExist, getAccessToRoute, getAnswerOwnerAccess], 
deleteAnswer);
module.exports = router;
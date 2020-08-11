const express = require("express");
const { getSingleUser, getAllUser } = require("../controllers/user");
const { checkUserExist } = require("../middlewares/database/databaseErrorHelpers");
const { getAccessToRoute } = require("../middlewares/authorization/auth");
const router = express.Router();



router.get("/", getAllUser);
router.get("/:id", checkUserExist ,getSingleUser);

module.exports = router;


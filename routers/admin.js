const express = require("express");
const router = express.Router();
const { getAccessToRoute, getAdminAccess } = require("../middlewares/authorization/auth");
const { checkUserExist } = require("../middlewares/database/databaseErrorHelpers");
const { blockUser } = require("../controllers/admin");
// Block User


// Delete User
router.use([getAccessToRoute, getAdminAccess]);

router.get("/block/:id", checkUserExist, blockUser);

module.exports = router;


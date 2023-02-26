const { createUser, loginUser, updateUserDetails } = require("../controllers/userController");
const express = require("express");

const router = express.Router();

//register user
router.post("/register", createUser);
//login user
router.post("/login", loginUser);


router.put("/update/:id",updateUserDetails)
module.exports = router;

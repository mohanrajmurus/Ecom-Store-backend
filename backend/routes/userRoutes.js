const { createUser, loginUser, emailVerification } = require("../controllers/userController");
const express = require("express");

const router = express.Router();

//register user
router.post("/register", createUser);
//login user
router.post("/login", loginUser);
router.post('/emailverify',emailVerification)

module.exports = router;

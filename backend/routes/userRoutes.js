const { createUser, loginUser, emailVerification,updateCart, removeProduct } = require("../controllers/userController");
const express = require("express");

const router = express.Router();

//register user
router.post("/register", createUser);
//login user
router.post("/login", loginUser);
router.post('/emailverify',emailVerification);
router.put('/cart/:id',updateCart)
router.put('/remove/:id',removeProduct)

module.exports = router;

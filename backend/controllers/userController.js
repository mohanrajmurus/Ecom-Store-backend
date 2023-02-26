const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const { findOne } = require("../models/UserModel");
//Register User
const createUser = async (req, res) => {
  try {
    //Get User Input
    const { fullName, email, password } = req.body;
    //Validate user input
    if (!email || !fullName || !password)
      res.status(400).send("All inputs are required");

    //check  if user already exist on database
    const oldUser = await User.findOne({ email });
    if (oldUser)
      return res.status(409).send("User Account Already Exist.Please Login");
    //Encrypt user password
    const encryptedPassword = await bcrypt.hash(password, 10);

    //Register User profile on database
    const user = await User.create({
      fullName,
      email: email.toLowerCase(),
      password: encryptedPassword,
    });

    //return new User
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
  }
};

//Login User
const loginUser = async (req, res) => {
  try {
    //get user input
    const { email, password } = req.body;
    //validate user input
    if (!email || !password)
      return res.status(400).send("All inputs are required");
    //check if user registerd with us
    const user = await User.findOne({ email });
    //validate user password
    if (user) {
      if (await bcrypt.compare(password, user.password))
        return res.status(200).json(user);
      else return res.status(409).send("Invalid Credentials");
    } else
      res
        .status(409)
        .send("Your email not registred with US.Please Create Account");
  } catch (error) {
    console.log(error);
  }
};

const updateUserDetails = async (req, res) => {
  const { cart } = req.body;
  const user = await User.findOne({email:req.params.id})
  user.cart = cart
  const updateUser = await user.save()
  res.json(updateUser)
};

module.exports = { createUser, loginUser, updateUserDetails };

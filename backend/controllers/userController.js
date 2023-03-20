const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
//Register User
const createUser = async (req, res) => {
  try {
    //Get User Input
    const { fullName, email, password, mobileNum} = req.body;
    //Validate user input
    if (!email || !fullName || !password ||!mobileNum)
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
      mobileNum
    });

    //return new User
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
  }
};
//email verrification
const emailVerification = async (req, res) => {
  const randNum = Math.floor(100000 + Math.random() * 900000);
  const { email } = req.body;
  const oldUser = await User.findOne({ email });
  if (oldUser)
    return res.status(409).send("User Account Already Exist.Please Login");
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_ID,
      pass: process.env.PASS,
    },
    from:process.env.EMAIL_ID
  });
  const mailConfigurations = {
    from: "mohanraj.nothing@gmail.com",
    to: email,
    subject: "Email-Verification",
    text: `Email Verification OTP is ${randNum}`,
  };
  transporter.sendMail(mailConfigurations, (error) => {
    if (error) throw Error(error);
    res.json(randNum);
  });
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
const updateCart = async(req,res)=>{
  const id =req.params.id;
  //console.log(req.body.id);
  const user = await User.findById(id)
  user.cart.push(req.body.id)
  const upUser = await user.save()
  if(upUser) return res.status(200).json(upUser);
  else return;
}
//remove product from cart
const removeProduct = async(req,res)=>{
  //console.log(req.body.id)
  const user = await User.findById(req.params.id)
  user.cart = user.cart.filter(item => item !== req.body.id)
  const updatedUser = await user.save();
  if(updatedUser) return res.status(200).json(updatedUser);
  else return;
}
//Add address
const addAddress = async(req,res)=>{
  const id =req.params.id;
  //console.log(req.body.id);
  const user = await User.findById(id)
  console.log(req.body.delAddress);
  user.address= Object.assign({},req.body.delAddress)
  const upUser = await user.save()
  if(upUser) return res.status(200).json(upUser);
  else return;
}
module.exports = { createUser, loginUser, emailVerification,updateCart ,removeProduct,addAddress};

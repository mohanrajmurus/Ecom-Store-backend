const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const userSchema = new Schema({
  fullName: { type: String, default: null },
  email: { type: String, unique: true },
  mobileNum:{type:String,unique:true},
  password: { type: String },
  token: { type: String },
  cart: { type: Array, default: null },
  address: {
    doorNo:{type:String,default:null},
    streetName:{type:String,default:null},
    location:{type:String,default:null},
    city:{type:String,default:null},
    landmark:{type:String,default:null},
    pincode:{type:String,default:null}
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;

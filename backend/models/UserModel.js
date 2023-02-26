const mongoose = require('mongoose');
const {Schema} = require('mongoose');

const userSchema = new Schema({
    fullName:{type:String,default:null},
    email:{type:String,unique:true},
    password:{type:String},
    token:{type:String},
    cart:{type:Array,default:null}
}
);

const User = mongoose.model("User",userSchema);

module.exports = User;
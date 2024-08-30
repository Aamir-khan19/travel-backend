const mongoose = require('mongoose');

// Schema
const userSchema = new mongoose.Schema({
  firstName: {type: String, required: [true, "First name is required"]},
  lastName: {
    type: String
  },
  email: {
    type: String,
    unique: [true, "Email {VALUE} already exists"],
    validate: {
        validator: (v)=>{
         return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v);
        },
        message: (props)=> `${props.value} is not a valid email address`
    },
    required: [true, "Email is required"]
  },
  phone: {
    type: Number,
    required: [true, "Phone number us required"]
  },
  description: {
    type: String,
    required: [true, "description is required"]
  }
  });

const User = mongoose.model('User', userSchema);

module.exports = User
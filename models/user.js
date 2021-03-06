const mongoose = require("mongoose");
const { Schema, model } = mongoose;
 
const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: [true, 'Username is required.'],
      unique: true
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'],
      unique: true,
      lowercase: true,
      trim: true
    },
    passwordHash: {
      type: String,
      required: [true, 'Password is required.']
    },
    books: {
      type: [{ type: Schema.Types.ObjectId, ref: "Book" }]
    },
    authors: { 
      type: [{ type: Schema.Types.ObjectId, ref: "Author" }] 
  }
  },
  {
    timestamps: true
  }
);

const User = model('User', userSchema); 
module.exports = User;

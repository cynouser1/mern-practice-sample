// const mongoose = require('mongoose');
import mongoose from "mongoose";
// const bcrypt = require('bcrypt');
// import bcrypt from 'bcrypt'

// const userSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
// }, { timestamps: true });

const userSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, required: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    phone: { type: String },
    bio: { type: String },
    address: {
      street: { type: String },
      landmark: { type: String },
      city: { type: String },
      state: { type: String },
      pincode: { type: String },
    },
    socialLinks: {
      facebook: { type: String },
      twitter: { type: String },
      linkedin: { type: String },
      github: { type: String },
    },
    googleId: {type: String}
  },
  { timestamps: true }
);

// Hash password before saving
// userSchema.pre('save', async function (next) {
//     if (!this.isModified('password')) return next(); // Skip if password unchanged

//     try {
//         const salt = await bcrypt.genSalt(10);
//         this.password = await bcrypt.hash(this.password, salt);
//         next();
//     } catch (err) {
//         next(err);
//     }
// });

const User = mongoose.model("users", userSchema);

// module.exports = User;
export default User;

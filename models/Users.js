const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
  username: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
  },
  password:{
      type:String,
      trim: true,
  }
});

module.exports = mongoose.model('Users', usersSchema);
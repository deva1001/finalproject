const mongoose = require('mongoose');

const UserDataSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  height: Number,
  weight: Number,
  age: Number,
  goal: String,
  DCI: String,
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('UserData', UserDataSchema);

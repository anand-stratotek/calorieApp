const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  activityLevel: {
    type: Number,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  bodyFat: {
    type: Number,
    required: true,
  },
  bmr: {
    type: Number,
  },
  tdee: {
    type: Number,
  },
});

module.exports = Users = mongoose.model('users', UserSchema);

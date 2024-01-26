const mongoose = require('mongoose');

const {Schema} = mongoose;
mongoose.connect(process.env.DB_URL);

const userSchema = new Schema({
    phone_number: String,
    priority: {
      type: Number,
      enum: [0, 1, 2],
      default: 0,
    },
  });
  
  const User = mongoose.model('User', userSchema);

module.exports = User;
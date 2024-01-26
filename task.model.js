const mongoose = require('mongoose');

const {Schema} = mongoose;
mongoose.connect(process.env.DB_URL);

const taskSchema = new Schema({
    title: String,
    description: String,
    due_date: String,
    priority: Number,
    status: {
      type: String,
      enum: ['TODO', 'IN_PROGRESS', 'DONE'],
      default: 'TODO',
    },
    user_id: String, // Reference to User model
    deleted_at: Date,
  });
  
  const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
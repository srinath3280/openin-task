require('dotenv').config();
const User = require('./user.model');
const Task = require('./task.model');
const SubTask = require('./subtask.model');
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const cron = require('node-cron');
const twilio = require('twilio');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Authentication middleware
// const authenticateUser = (req, res, next) => {
//     const token = req.header('Authorization');
//     if (!token) return res.status(401).json({ message: 'Unauthorized' });
  
//     try {
//       const decoded = jwt.verify(token, 'your_secret_key');
//       req.user = decoded;
//       next();
//     } catch (error) {
//       res.status(401).json({ message: 'Invalid token' });
//     }
// };

// API to create a task
app.post('/tasks', async (req, res) => {
    console.log(req.body)
    try {
      const { title, description, due_date } = req.body;
      const task = new Task({
        title,
        description,
        due_date,
      });
      await task.save();
      res.json(task);
    } catch (error) {
      res.json({ message: error.message });
    }
  });
  
  // API to create a subtask
  app.post('/subtasks',  async (req, res) => {
    try {
      const { task_id } = req.body;
      const subTask = new SubTask({ task_id });
      await subTask.save();
      res.json(subTask);
    } catch (error) {
      res.json({ message: error.message });
    }
  });
  
  // API to get all user tasks
  app.get('/tasks',  async (req, res) => {
    Task.find()
    .then((data)=>data.filter((d)=>{
        res.json(d);
    }))
    // .catch((err)=>{res.send('Error',err)});
  });
  
  // API to get all user subtasks
  app.get('/subtasks',  async (req, res) => {
    SubTask.find()
    .then((data)=>data.filter((d)=>{
        res.json(d);
    }))
  });
  
  // API to update a task
  app.put('/tasks/:id',  async (req, res) => {
    Task.find()
    .then((data)=>data.filter((d)=>{
        res.json(d);
    }))
    // try {
    //   const { due_date, status } = req.body;
    //   const task = await Task.findOneAndUpdate(
    //     { _id: req.params.id, user_id: req.user.user_id, deleted_at: null },
    //     { due_date, status },
    //     { new: true }
    //   );
  
    //   // Update corresponding subtasks
    //   await SubTask.updateMany({ task_id: req.params.id, deleted_at: null }, { updated_at: new Date() });
  
    //   res.json(task);
    // } catch (error) {
    //   res.json({ message: error.message });
    // }
  });
  
  // API to update a subtask
  app.put('/subtasks/:id',  async (req, res) => {
    SubTask.find()
    .then((data)=>data.filter((d)=>{
        res.json(d);
    }))
    // try {
    //   const { status } = req.body;
    //   const subTask = await SubTask.findOneAndUpdate(
    //     { _id: req.params.id, deleted_at: null },
    //     { status, updated_at: new Date() },
    //     { new: true }
    //   );
    //   res.json(subTask);
    // } catch (error) {
    //   res.json({ message: error.message });
    // }
  });
  
  // API to delete a task (soft deletion)
  app.delete('/tasks/:id',  async (req, res) => {
    Task.find()
    .then((data)=>data.filter((d)=>{
        res.json(d);
    }))
    // try {
    //   const task = await Task.findOneAndUpdate(
    //     { _id: req.params.id, user_id: req.user.user_id, deleted_at: null },
    //     { deleted_at: new Date() },
    //     { new: true }
    //   );
  
    //   // Soft delete corresponding subtasks
    //   await SubTask.updateMany({ task_id: req.params.id, deleted_at: null }, { deleted_at: new Date() });
  
    //   res.json(task);
    // } catch (error) {
    //   res.json({ message: error.message });
    // }
  });
  
  // API to delete a subtask (soft deletion)
  app.delete('/subtasks/:id',  async (req, res) => {
    SubTask.find()
    .then((data)=>data.filter((d)=>{
        res.json(d);
    }))
    // try {
    //   const subTask = await SubTask.findOneAndUpdate(
    //     { _id: req.params.id, deleted_at: null },
    //     { deleted_at: new Date() },
    //     { new: true }
    //   );
    //   res.json(subTask);
    // } catch (error) {
    //   res.json({ message: error.message });
    // }
  });

  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  });
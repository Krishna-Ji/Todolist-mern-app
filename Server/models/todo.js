// models/todo.js

const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
  text: String,
});

const Todo = mongoose.model('Todo', TodoSchema);

module.exports = Todo;
const mongoose = require("mongoose");
const Date = require("../date");

const taskSchema = mongoose.Schema({
  type: String,
  task: String,
  createdAt: {
    type: String,
    default: Date,
  },
  isDone: {
    type: Boolean,
    default: false,
  },
});

const Task = new mongoose.model("Task", taskSchema);

module.exports = Task;

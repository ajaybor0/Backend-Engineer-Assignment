import mongoose from 'mongoose';
import Subtask from './subTaskModel.js';

const taskSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    dueDate: Date,
    status: {
      type: String,
      enum: ['TODO', 'IN_PROGRESS', 'DONE'],
      default: 'TODO'
    },
    priority: {
      type: Number,
      default: 0
    },
    subtasks: [Subtask.schema], // Subtask schema
    deletedAt: { type: Date, default: null } // Soft deletion field
  },

  {
    // Include timestamps for createdAt and updatedAt
    timestamps: true
  }
);

// Calculate priority based on due date
taskSchema.pre('save', function (next) {
  if (this.dueDate) {
    const today = new Date();
    const dueDate = new Date(this.dueDate);

    const timeDiff = dueDate.getTime() - today.getTime();
    const daysDiff = Math.ceil(timeDiff / (24 * 60 * 60 * 1000));

    if (daysDiff === 0) {
      this.priority = 0; // Due date is today
    } else if (daysDiff <= 2) {
      this.priority = 1; // Due date is between tomorrow and day after tomorrow
    } else if (daysDiff <= 4) {
      this.priority = 2; // Due date is between 3 and 4 days
    } else {
      this.priority = 3; // Due date is 5 or more days away
    }
  }

  // Filter completed subtasks
  const completedSubtasks = this.subtasks.filter(
    subtask => subtask.status === 1
  );

  // Determine task status based on the number of completed subtasks
  if (completedSubtasks.length === 0) {
    this.status = 'TODO';
  } else if (completedSubtasks.length < this.subtasks.length) {
    this.status = 'IN_PROGRESS';
  } else {
    this.status = 'DONE';
  }

  //Proceed with the save operation.
  next();
});

const Task = mongoose.model('Task', taskSchema);

export default Task;

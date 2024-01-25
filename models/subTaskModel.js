import mongoose from 'mongoose';

const subtaskSchema = new mongoose.Schema(
  {
    taskId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Task'
    },
    status: { type: Number, enum: [0, 1], default: 0 },
    deletedAt: { type: Date, default: null } // Soft deletion field
  },
  {
    // Include timestamps for createdAt and updatedAt
    timestamps: true
  }
);

const Subtask = mongoose.model('Subtask', subtaskSchema);

export default Subtask;

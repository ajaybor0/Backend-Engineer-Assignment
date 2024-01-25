import Subtask from '../models/subTaskModel.js';
import Task from '../models/taskModel.js';

// @desc     Create new sub-task
// @method   POST
// @endpoint /api/v1/sub-tasks/:id
// @access   Private

const createSubTask = async (req, res, next) => {
  try {
    const { id: taskId } = req.params;

    // Check if the task with the provided taskId exists
    const task = await Task.findById(taskId);
    if (!task) {
      res.statusCode = 404;
      throw new Error('Task not found!');
    }

    const subTask = new Subtask({
      taskId
    });

    task.subtasks = [...task.subtasks, subTask];
    await task.save();
    res.status(200).json({ message: 'Subtask created' });
  } catch (error) {
    next(error);
  }
};

// @desc     Get all user sub-task
// @method   GET
// @endpoint /api/v1/sub-tasks/:id?id
// @access   Private
const subTasks = async (req, res, next) => {
  try {
    const { id: taskId } = req.params;
    const { id: subTaskId } = req.query;

    const task = await Task.findById(taskId);

    if (!task) {
      res.statusCode = 404;
      throw new Error('Task not found!');
    }

    //Filter by subTaskId in the query parameters
    let filteredSubtasks = task.subtasks;

    if (subTaskId) {
      filteredSubtasks = task.subtasks.filter(
        subtask => subtask._id.toString() === subTaskId
      );
    }

    if (!filteredSubtasks || filteredSubtasks.length === 0) {
      res.statusCode = 404;
      throw new Error('Subtasks not found!');
    }

    res.status(200).json(filteredSubtasks);
  } catch (error) {
    next(error);
  }
};

// @desc     Update sub-task
// @method   PUT
// @endpoint /api/v1/sub-tasks/:id/:id
// @access   Private
const updateSubTask = async (req, res, next) => {
  try {
    const { status } = req.body;
    const { id: taskId } = req.params;
    const { id: subTaskId } = req.query;

    // Check if the task with the provided taskId exists
    const task = await Task.findById(taskId);
    if (!task) {
      res.statusCode = 404;
      throw new Error('Task not found!');
    }

    // Find subtask by subTaskId
    const subTask = task.subtasks.find(
      subtask => subtask._id.toString() === subTaskId
    );
    if (!subTask) {
      res.statusCode = 404;
      throw new Error('Subtask not found!');
    }

    subTask.status = Number(status) || subTask.status;

    await task.save();
    res.status(200).json({ message: 'Subtask updated' });
  } catch (error) {
    next(error);
  }
};

// @desc     Delete sub-task (soft deletion)
// @method   PATCH
// @endpoint /api/v1/sub-tasks/:id
// @access   Private
const softDeleteSubTask = async (req, res, next) => {
  try {
    const { id: taskId } = req.params;
    const { id: subTaskId } = req.query;

    // Check if the task with the provided taskId exists
    const task = await Task.findById(taskId);
    if (!task) {
      res.statusCode = 404;
      throw new Error('Task not found!');
    }

    // Find subtask by subTaskId
    const subTask = task.subtasks.find(
      subtask => subtask._id.toString() === subTaskId
    );
    if (!subTask) {
      res.statusCode = 404;
      throw new Error('Subtask not found!');
    }

    subTask.deletedAt = new Date();

    await task.save();
    res.status(200).json({ message: 'Subtask soft deleted' });
  } catch (error) {
    next(error);
  }
};

export { createSubTask, subTasks, updateSubTask, softDeleteSubTask };

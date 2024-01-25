import Task from '../models/taskModel.js';

// @desc     Create new task
// @method   POST
// @endpoint /api/v1/tasks
// @access   Private

const createTask = async (req, res, next) => {
  try {
    const { title, description, dueDate } = req.body;

    const task = new Task({
      user: req.user._id,
      title,
      description,
      dueDate: new Date(dueDate)
    });

    const createdTask = await task.save();
    console.log('Task saved:', createdTask);
    res.status(200).json({ message: 'Task created', createdTask });
  } catch (error) {
    next(error);
  }
};

// @desc     Get all user task
// @method   GET
// @endpoint /api/v1/tasks?page=1&limit=10&priority=3&dueDate=2024-02-15
// @access   Private
const tasks = async (req, res, next) => {
  try {
    // Filters based on query parameters
    const filters = {
      user: req.user._id
    };

    if (req.query.priority) {
      filters.priority = req.query.priority;
    }

    if (req.query.dueDate) {
      filters.dueDate = { $lte: new Date(req.query.dueDate) };
    }

    // Pagination
    const total = await Task.countDocuments();
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Query tasks based on filters
    const tasks = await Task.find(filters)
      .sort({ dueDate: 1 }) // Sort by due date ascending
      .skip(skip)
      .limit(limit);

    if (!tasks || tasks.length === 0) {
      res.statusCode = 404;
      throw new Error('Tasks not found!');
    }

    res.status(200).json({
      tasks,
      total,
      limit,
      page
    });
  } catch (error) {
    next(error);
  }
};

// @desc     Update task
// @method   PUT
// @endpoint /api/v1/tasks/:id
// @access   Private
const updateTask = async (req, res, next) => {
  try {
    const { title, description, dueDate, status } = req.body;
    const { id: taskId } = req.params;
    const task = await Task.findById(taskId);

    if (!task) {
      res.statusCode = 404;
      throw new Error('Task not found!');
    }

    task.title = title || task.title;
    task.description = description || task.description;
    task.dueDate = new Date(dueDate) || task.dueDate;
    task.status = status || task.status;

    const updatedTask = await task.save();

    res.status(200).json({ message: 'Task updated', updatedTask });
  } catch (error) {
    next(error);
  }
};

// @desc     Delete task(soft deletion)
// @method   PATCH
// @endpoint /api/v1/tasks/:id
// @access   Private
const softDeleteTask = async (req, res, next) => {
  try {
    const { id: taskId } = req.params;

    const task = await Task.findById(taskId);
    if (!task) {
      res.statusCode = 404;
      throw new Error('Task not found!');
    }

    task.deletedAt = new Date();

    await task.save();

    res.status(200).json({ message: 'Task soft deleted' });
  } catch (error) {
    next(error);
  }
};

export { createTask, tasks, updateTask, softDeleteTask };

import { v4 } from "uuid";
// import tasks from "../models/taskStorage.js";
import db from '../database/database.js';

// USING IN-MEMORY STORAGE

// // Creating a new task
// export const createTask = (req, res) => {
//   const { title, description, status } = req.body;

//   const newTask = {
//     id: v4(),
//     title,
//     description,
//     status: status || "PENDING",
//     createdAt: new Date().toISOString(),
//     updatedAt: new Date().toISOString()
//   };

//   tasks.push(newTask);
//   res.status(201).json(newTask);
// }

// // Fetch all tasks (paginated)
// export const getAllTasks = (req, res) => {

//   const page = parseInt(req.query.page) || 1;
//   const limit = parseInt(req.query.limit) || 4;

//   const title = req.query.title?.toLowerCase();
//   const status = req.query.status?.toLowerCase();

//   const startIndex = (page - 1) * limit;
//   const endIndex = page * limit;

//   let filteredTasks = tasks;

//   if (title) {
//     filteredTasks = filteredTasks.filter(task =>
//       task.title.toLowerCase().includes(title)
//     );
//   }

//   if (status) {
//     filteredTasks = filteredTasks.filter(task =>
//       task.status.toLowerCase() === status
//     );
//   }

//   const paginated = filteredTasks.slice(startIndex
//     , endIndex
//   )
//   res.json({
//     page: page,
//     limit: limit,
//     tasks: paginated,
//   });
// }

// // Fetch a task by id
// export const getTaskById = (req, res) => {
//   const taskId = req.params.id;
//   const task = tasks.find(t => t.id = taskId);
//   if (!task) {
//     return res.status(404).json({
//       message: `Task not found with ID: ${taskId}`
//     })
//   }
//   res.json(task);
// }

// // Update a task by id
// export const updateTask = (req, res) => {
//   const taskId = req.params.id;
//   const task = tasks.findIndex(t => t.id = taskId);
//   const { title, description, status } = req.body;

//   if (task === -1) {
//     return res.status(404).json({
//       message: `Task not found with ID: ${taskId}`
//     })
//   }

//   tasks[task] = {
//     ...tasks[task],
//     title: title || tasks[task].title,
//     description: description || tasks[task].description,
//     status: status || tasks[task].status,
//     updatedAt: new Date().toISOString()
//   }

//   res.status(201).json(tasks[task]);
// }

// // Delete task by id
// export const deleteTask = (req, res) => {
//   const taskId = req.params.id;
//   const task = tasks.findIndex(t => t.id = taskId);

//   if (task === -1) {
//     return res.status(404).json({
//       message: `Task not found with ID: ${taskId}`
//     })
//   }

//   tasks.splice(task, 1);
//   res.json({
//     message: "Task deleted successfully"
//   })
// }

// Calling APIs through MySQL database

// Get all tasks (with optional search by title or status)
export const getAllTasks = async (req, res) => {
  try {
    const { title, status } = req.query;
    let query = 'SELECT * FROM task_table';
    const queryParams = [];

    if (title || status) {
      query += ' WHERE';
      if (title) {
        query += ' title LIKE ?';
        queryParams.push(`%${title}%`);
      }
      if (title && status) {
        query += ' AND';
      }
      if (status) {
        query += ' status = ?';
        queryParams.push(status);
      }
    }

    const [rows] = await db.query(query, queryParams);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get task by ID
export const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await db.query('SELECT * FROM task_table WHERE id = ?', [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Adding a task
export const createTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const id = v4();

    const [result] = await db.query(
      'INSERT INTO task_table (id, title, description, status) VALUES (?, ?, ?, ?)',
      [id, title, description, status]
    );
    res.status(201).json({ id, title, description, status });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update task by ID
export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;
    await db.query(
      'UPDATE task_table SET title = ?, description = ?, status = ? WHERE id = ?',
      [title, description, status, id]
    );
    res.json({ message: 'Task updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete task by ID
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    await db.query('DELETE FROM task_table WHERE id = ?', [id]);
    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const express = require("express");

const router = express.Router();

const {
  createTask,
  getTasks,
  updateTaskStatus,
  deleteTask,
} = require("../controllers/taskController");

const protect = require("../middleware/authMiddleware");

const authorizeRoles = require("../middleware/roleMiddleware");

// Create Task (Admin Only)
router.post(
  "/",
  protect,
  authorizeRoles("admin"),
  createTask
);

// Get All Tasks
router.get("/", protect, getTasks);

// Update Task Status
router.put("/:id", protect, updateTaskStatus);

// Delete Task
router.delete("/:id", protect, deleteTask);

module.exports = router;
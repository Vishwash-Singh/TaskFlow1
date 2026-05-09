const express = require("express");

const router = express.Router();

const {
  createProject,
  getProjects,
} = require("../controllers/projectController");

const protect = require("../middleware/authMiddleware");

const authorizeRoles = require("../middleware/roleMiddleware");

// Create Project (Admin Only)
router.post(
  "/",
  protect,
  authorizeRoles("admin"),
  createProject
);

// Get All Projects
router.get("/", protect, getProjects);

module.exports = router;
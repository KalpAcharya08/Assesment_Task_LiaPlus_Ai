const express = require('express');
const router = express.Router();
const { authenticateToken, authorizeRoles } = require('../middleware/authMiddleware');
const {
    createBlog,
    getBlogs,
    getBlogById,
    updateBlog,
    deleteBlog,
} = require('../controllers/blogcontroller');

// Public routes (accessible by anyone)
router.get('/', getBlogs); // Get all blogs
router.get('/:id', getBlogById); // Get single blog by ID

// Protected routes (accessible by authenticated users)
router.post('/', authenticateToken, createBlog); // Create a new blog post

// Admin and author protected routes
router.put('/:id', authenticateToken, authorizeRoles('admin', 'user'), updateBlog); // Update a blog post
router.delete('/:id', authenticateToken, authorizeRoles('admin', 'user'), deleteBlog); // Delete a blog post

module.exports = router;

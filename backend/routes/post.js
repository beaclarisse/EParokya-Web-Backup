// routes/postRoutes.js
const express = require('express');
const Post = require('../controllers/PostController');
const upload = require('../utils/multer')

const router = express.Router();
const { isAuthenticatedUser, authorizeAdmin } = require('../middleware/auth');
// Route for creating a post with multiple images
router.post('/admin/post/create', isAuthenticatedUser, upload.array('images', 10),authorizeAdmin("admin"), Post.createPost); // Limit of 5 images per post
router.get('/admin/posts', isAuthenticatedUser,authorizeAdmin("admin"), Post.getAllPosts);
router.get('/admin/post/:id', isAuthenticatedUser, authorizeAdmin("admin"), Post.getSinglePost)
router.delete('/admin/post/:id', isAuthenticatedUser,authorizeAdmin("admin"), Post.deletePost);
router.put('/admin/post/:id', isAuthenticatedUser,authorizeAdmin("admin"), upload.array('images'), Post.updatePost)

//guest
router.get('/posts', Post.getPosts);
module.exports = router;

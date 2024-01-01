const express = require('express');
const router = express.Router();

const { 
    SignUp, 
    LoginIn,
    getUserPosts
} = require('../controllers/UserController');

const {
    createPost,
    addComments,
    getAllPosts,
    getCommentsData,
    searchPosts,
    getSinglePost
} = require('../controllers/PostsController');

// User Routes

router.post('/signup', SignUp);
router.post('/login', LoginIn);
router.post('/myPosts', getUserPosts);
// Post Routes

router.get('/posts', getAllPosts);
router.post('/posts', createPost);
router.patch('/posts', addComments);
router.get('/commentsData/:id', getCommentsData);
router.get('/searchedPosts', searchPosts)
router.get('/post/:id', getSinglePost)

module.exports = router;
const Post = require('../models/Post');
const User = require('../models/User');



const getAllPosts = async (req, res) => {
    try {

        const posts = await Post.find().sort({ _id: -1 }).populate({
            path: 'made_by',
            model: 'User',
            select: 'name',
        });
        
        const postsWithUserNames = posts.map((post) => ({
            _id: post._id,
            made_by: post.made_by ? post.made_by.name : 'Unknown User',
            content: post.content,
            comments: post.comments,
        }));
        
        res.status(200).json(postsWithUserNames);
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getSinglePost = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findById(id).populate({
            path: 'made_by',
            model: 'User',
            select: 'name',
        });

        const postWithUserName = {
            _id: post._id,
            made_by: post.made_by.name,
            content: post.content,
            comments: post.comments,
            __v: post.__v,
        };

        res.status(200).json(postWithUserName);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const createPost = async (req, res) => {
    try {
        const { content, userId } = req.body;

        const newPost = new Post({
            made_by: userId,
            content,
            comments: []
        });

        const post = await newPost.save();

        const user = await User.findById(userId);
        user.posts.push(post._id);
        await user.save();

        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


const addComments = async (req, res) => {
    try {
        const { content, postId, userId } = req.body;

        const post = await Post.findById(postId);

        const newComment = {
            commented_by: userId,
            content
        }

        post.comments.push(newComment);

        await post.save();

        const commentWithUserName = {
            commented_by: (await User.findById(userId)).name,
            content
        }

        res.status(201).json(commentWithUserName);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


const getCommentsData = async (req, res) => {
    try {

        const { id } = req.params;

        const post = await Post.findById(id);

        const comments = post.comments;

        const usersWithComments = await Promise.all(comments.map(async (comment) => {
            const user = await User.findById(comment.commented_by);
            return {
                made_by: user.name,
                content: comment.content
            }
        }));

        res.status(200).json(usersWithComments);

    } catch (error) {

    }
}

const searchPosts = async (req, res) => {
    try {
        const { query } = req.query;
        const posts = await Post.find({
            $or: [
                { made_by: { $regex: query, $options: 'i' } },
                { content: { $regex: query, $options: 'i' } },
                { 'comments.commented_by': { $regex: query, $options: 'i' } },
                { 'comments.content': { $regex: query, $options: 'i' } },
            ],
        }).sort({ _id: -1 }).populate({
            path: 'made_by',
            model: 'User',
            select: 'name',
        });

        const postsWithUserNames = posts.map((post) => ({
            _id: post._id,
            made_by: post.made_by.name,
            content: post.content,
            comments: post.comments,
            __v: post.__v,
        }));

        res.status(200).json(postsWithUserNames);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    createPost,
    addComments,
    getAllPosts,
    getCommentsData,
    searchPosts,
    getSinglePost
}
const Post = require('../models/Post');

exports.getPosts = async (req, res) => {
    const posts = await Post.find().populate('author', 'name');
    res.json(posts);
};

exports.createPost = async (req, res) => {
    const { title, content } = req.body;
    const post = await Post.create({ title, content, author: req.user._id });
    res.status(201).json(post);
};

exports.deletePost = async (req, res) => {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    await post.deleteOne();
    res.json({ message: 'Post removed' });
};

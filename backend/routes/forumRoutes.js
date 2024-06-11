const express = require('express');
const multer = require('multer');
const axios = require('axios');
const FormData = require('form-data');
const Post = require('../model/forummodel');
const Comment = require('../model/comment');
const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/:postId/comments', async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const newComment = new Comment({
      content: req.body.content,
      user: req.body.user,  // Use user ID from request body
      post: post._id,
    });

    await newComment.save();

    post.comments.push(newComment);
    await post.save();

    res.status(201).json(newComment);
  } catch (error) {
    console.error('Error creating comment:', error);
    res.status(500).json({ message: 'Failed to create comment' });
  }
});


router.get('/:postId/comments', async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId).populate('comments').exec();
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.status(200).json(post.comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ message: 'Failed to fetch comments' });
  }
});

router.get('/', async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).send('Failed to fetch posts');
  }
});

router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('user', 'username profileImage')  // Populate user details for the post
      .populate({
        path: 'comments',
        populate: {
          path: 'user',
          select: 'username profileImage',  // Populate user details for each comment
        }
      });
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.json(post);
  } catch (error) {
    console.error('Error fetching post:', error);
    res.status(500).send('Failed to fetch post');
  }
});


router.post('/create', upload.single('image'), async (req, res) => {
  try {
    let imageUrl = '';
    if (req.file) {
      const formData = new FormData();
      formData.append('image', req.file.buffer.toString('base64'));

      const response = await axios.post('https://api.imgur.com/3/image', formData, {
        headers: {
          'Authorization': `Client-ID ${process.env.IMGUR_CLIENT_ID}`,
          ...formData.getHeaders(),
        },
      });

      imageUrl = response.data.data.link;
    }

    const newPost = new Post({
      title: req.body.title,
      content: req.body.content,
      category: req.body.category,
      imageUrl,
      user: req.body.user,
    });

    await newPost.save();
    res.status(201).send('Post created successfully');
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).send('Failed to create post');
  }
});


module.exports = router;

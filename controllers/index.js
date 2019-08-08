const models = require("../database/models");

const createPost = async (req, res) => {
  try {
    const post = await models.Post.create(req.body);
    return res.status(201).json({
      post
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await models.Post.findAll({
      include: [
        {
          model: models.Comment,
          as: "comments"
        },
        {
          model: models.User,
          as: "author"
        }
      ]
    });
    return res.status(200).json({ posts });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const getPostById = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await models.Post.findOne({
      where: { id: postId },
      include: [
        {
          model: models.Comment,
          as: "comments",
          include: [
            {
              model: models.User,
              as: "author"
            }
          ]
        },
        {
          model: models.User,
          as: "author"
        }
      ]
    });
    if (post) {
      return res.status(200).json({ post });
    }
    return res.status(404).send("Post with the specified ID does not exists");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const updatePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const [updated] = await models.Post.update(req.body, {
      where: { id: postId }
    });
    if (updated) {
      const updatedPost = await models.Post.findOne({ where: { id: postId } });
      return res.status(200).json({ post: updatedPost });
    }
    throw new Error("Post not found");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const deletePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const deleted = await models.Post.destroy({
      where: { id: postId }
    });
    if (deleted) {
      return res.status(204).send("Post deleted");
    }
    throw new Error("Post not found");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost
};

const postModel = require("../models/post.model");
const PostDTO = require("../dtos/post.dto");
const UserDTO = require("../dtos/user.dto");
const FileDTO = require("../dtos/file.dto");
const ApiError = require("../exceprions/api.error");

const FileService = require("./file.service");
const TagService = require("./tag.service");
const ReactionService = require("./reaction.service");
const CommentService = require("./comment.serice");
const UserPostReadService = require("./userPostRead.service");

const { ObjectId } = require("mongodb");

class PostService {
  async create(author, postData, file) {
    const fileData = await FileService.create(file);
    const tagsList = await TagService.insertTags(postData.tags);

    const post = await postModel.create({
      author,
      title: postData.title,
      body: postData.body,
      tags: tagsList,
      timeRead: postData.timeRead,
      file: fileData.id,
    });

    const postPopulate = await post
      .populate("author")
      .populate("file")
      .populate("tags")
      .execPopulate();

    const postDTO = await this.getExtendedPostDTO(postPopulate, author);
    return postDTO;
  }

  async edit(postId, userId, title, body, newFile) {
    const postData = await this.postExist(postId);
    this.checkPostAuthor(userId, postData.author.id);

    if (newFile !== undefined) {
      await FileService.update(postData.file, newFile);
    }

    if (title !== undefined) {
      postData.title = title;
    }

    if (body !== undefined) {
      postData.body = body;
    }

    const post = await postData.save();
    const postPopulate = await post.populate("author").execPopulate();
    const postDTO = await this.getExtendedPostDTO(postPopulate);
    return postDTO;
  }

  async delete(postId, userId) {
    const postData = await this.postExist(postId);
    this.checkPostAuthor(userId, postData.author.id);

    postData.deleteOne();
    await ReactionService.deletePostReactions(postId);

    return true;
  }

  async postExist(postId) {
    const post = await postModel
      .findById(postId)
      .populate("author")
      .populate("file")
      .populate("tags");

    if (post === null) {
      throw ApiError.HttpException(`Post with id ${postId} not found`);
    }

    return post;
  }

  async getUserPostData(userId) {
    const posts = await postModel.find().where("author").equals(userId);
    const postsId = posts.map((post) => ObjectId(post._id));

    const comments = await CommentService.usersComments(userId);
    const userRating = await ReactionService.getUserRating(postsId);
    const reactions = await ReactionService.getPersonalLikes(userId);

    return { userRating, comments, reactions };
  }

  async getOne(postId, userId, ip) {
    const post = await this.postExist(postId);
    const postDTO = await this.getExtendedPostDTO(post, userId);

    const checkStatus = await UserPostReadService.chechIsReadStatus(postId, ip);

    if (checkStatus) {
      UserPostReadService.setIsReadStatus(postId, ip);
    }

    return postDTO;
  }

  async searchBySubstring(substring) {
    const posts = await postModel
      .find({
        title: { $regex: substring },
      })
      .populate("author");

    const postsDTO = posts.map((post) => this.createPostListDTO(post));
    return postsDTO;
  }

  async getAllPosts() {
    const posts = await postModel.find().populate("author");
    const postsDTO = posts.map((post) => this.createPostListDTO(post));
    return postsDTO;
  }

  async getLimitPosts(currentPage, limit) {
    const postsData = await this.getPosts({}, currentPage, limit);
    return postsData;
  }

  async getLimitUserPosts(currentPage, limit, userId) {
    const postsData = await this.getPosts(
      {
        author: userId,
      },
      currentPage,
      limit
    );
    return postsData;
  }

  async getPosts(filter, currentPage, limit) {
    const posts = await postModel
      .find(filter)
      .skip((currentPage - 1) * limit)
      .limit(parseInt(limit))
      .populate("author");

    const postsDTO = posts.map((post) => this.createPostListDTO(post));

    let nextPage = null;

    if (postsDTO.length == limit) {
      nextPage = true;
    } else {
      nextPage = false;
    }

    return { nextPage, posts: postsDTO };
  }

  checkPostAuthor(userId, postAuthor) {
    if (postAuthor.toString() !== userId) {
      throw ApiError.HttpException(
        `User with id ${userId} not author this post`
      );
    }
  }

  createPostListDTO(postModel) {
    const postDTO = new PostDTO(postModel);
    postDTO.setUserName(postModel.author.email);
    return postDTO;
  }

  async getExtendedPostDTO(postModel, userId) {
    const postDTO = new PostDTO(postModel);
    const userDTO = new UserDTO(postModel.author);
    const fileDTO = new FileDTO(postModel.file);

    const tagsList = postModel.tags.map((tag) => tag.title);

    postDTO.setAuthor(userDTO);
    postDTO.setImage(fileDTO);
    postDTO.setTags(tagsList);

    const reactionData = await ReactionService.getReactionsCount(
      postDTO.id,
      userId
    );
    postDTO.setLikes(reactionData);

    const commentsData = await CommentService.getList(postDTO.id);
    postDTO.setComments(commentsData);

    return postDTO;
  }

  async postReaction(postId, userId, isLiked) {
    const reactionStatus = await ReactionService.setReaction(
      postId,
      userId,
      isLiked
    );

    if (!reactionStatus) {
      await this.postExist(postId);
      await ReactionService.add(postId, userId, isLiked);
    }

    return true;
  }

  async addPostComment(userId, postId, message) {
    await this.postExist(postId);

    const inseredCommentDTO = await CommentService.create(
      userId,
      postId,
      message
    );
    return inseredCommentDTO;
  }
}

module.exports = new PostService();

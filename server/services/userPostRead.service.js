const UserPostReadModel = require("../models/userPostRead.model");
const PostModel = require("../models/post.model");

const { ObjectId } = require("mongodb");

class UserPostReadService {
  async chechIsReadStatus(postId, ip) {
    const res = await UserPostReadModel.findOne({
      $and: [{ post: postId }, { ip }],
    });

    return !res;
  }

  async setIsReadStatus(postId, ip) {
    const res = await UserPostReadModel.create({ post: postId, ip });

    const incStatus = await this.postIncReadCount(postId);

    return res;
  }

  async postIncReadCount(postId) {
    const res = await PostModel.updateOne(
      { _id: postId },
      { $inc: { readCount: 1 } }
    );

    return !!res;
  }
}

module.exports = new UserPostReadService();

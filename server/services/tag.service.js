const TagModel = require("../models/tag.model");
const PostModel = require("../models/post.model");

class TagService {
  async insertTags(tagsList) {
    const updateQueries = tagsList.map((tag) => ({
      updateOne: {
        filter: { title: tag },
        update: { $setOnInsert: { title: tag } },
        upsert: true,
      },
    }));

    try {
      const res = await TagModel.bulkWrite(updateQueries);

      console.log("success insert/update tag's list", res);
    } catch (e) {
      console.error("tag insert/update error", e);
    }
  }

  async removePostTag(tagTitle, postId) {
    try {
      const res = await PostModel.findByIdAndUpdate(postId, {
        $pull: { tags: tagTitle },
      });
    } catch (e) {
      console.error("tag remove post tag error", e);
    }
  }
}

module.exports = new TagService();

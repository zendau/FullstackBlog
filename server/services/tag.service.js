const TagModel = require("../models/tag.model");
const PostModel = require("../models/post.model");
const ApiError = require("../exceprions/api.error");

class TagService {
  async insertTags(tagsList) {
    try {
      // Ищем существующие теги в базе данных
      const existingTags = await TagModel.find({ title: { $in: tagsList } });

      // Список существующих тегов
      const existingTagNames = existingTags.map((tag) => tag.title);

      // Теги, которых нет в базе данных
      const newTags = tagsList.filter((tag) => !existingTagNames.includes(tag));

      // Создаем новые теги
      const newTagDocs = await TagModel.insertMany(
        newTags.map((tag) => ({ title: tag }))
      );

      // Массив идентификаторов всех тегов (включая уже существующие)
      const allTagIds = existingTags.concat(newTagDocs).map((tag) => tag._id);

      return allTagIds;
    } catch (err) {
      throw ApiError.HttpException("error adding tags");
      // Обработка ошибки
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

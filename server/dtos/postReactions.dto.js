/* eslint-disable prefer-destructuring */
export default class PostReactions {
  constructor(model) {
    this.id = model.id
    this.isLiked = model.isLiked
    this.postId = model.postId[0]
    this.postTitle = model.postTitle[0]
  }
}

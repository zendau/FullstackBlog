/* eslint-disable prefer-destructuring */
export default class PostComments {
  constructor(model) {
    this.id = model.id
    this.message = model.message
    this.postId = model.postId[0]
    this.postTitle = model.postTitle[0]
  }
}

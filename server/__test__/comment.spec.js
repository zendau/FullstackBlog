/* eslint-disable no-undef */
import commentModel from "../models/comment.model.js"
import CommentService from "../services/comment.service.js"

jest.mock("../models/comment.model.js")

describe("CommentService delete method", () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it("should delete a comment successfully", async () => {
    const commentId = "testCommentId"
    const userId = "testUserId"
    const deleteStatus = {}
    const expectedDTO = {}

    commentModel.findOneAndDelete.mockResolvedValue(deleteStatus)
    commentModel.populate.mockResolvedValue(deleteStatus) // If needed, mock populate method result

    const result = await CommentService.delete(commentId, userId)

    expect(result).toEqual(expectedDTO)
    expect(commentModel.findOneAndDelete).toHaveBeenCalledWith({
      $and: [{ _id: commentId }, { user: userId }],
    })
  })

  it("should throw an error if comment is not found", async () => {
    const commentId = "nonExistingCommentId"
    const userId = "testUserId"
    const deleteStatus = null // Simulate comment not found

    commentModel.findOneAndDelete.mockResolvedValue(deleteStatus)

    await expect(CommentService.delete(commentId, userId)).rejects.toThrow()
    expect(commentModel.findOneAndDelete).toHaveBeenCalledWith({
      $and: [{ _id: commentId }, { user: userId }],
    })
  })

  it("should throw an error if user is not the author of the comment", async () => {
    const commentId = "testCommentId"
    const userId = "wrongUserId"
    const deleteStatus = null

    commentModel.findOneAndDelete.mockResolvedValue(deleteStatus)

    await expect(CommentService.delete(commentId, userId)).rejects.toThrow()
    expect(commentModel.findOneAndDelete).toHaveBeenCalledWith({
      $and: [{ _id: commentId }, { user: userId }],
    })
  })
})

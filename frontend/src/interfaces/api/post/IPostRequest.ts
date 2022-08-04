export interface IPostRequest {
  postId?: string
  title: string
  body: string
  file: File | Blob
}
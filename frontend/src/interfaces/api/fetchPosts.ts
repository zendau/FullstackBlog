import { IPost } from "../post";

export default interface IFetchPosts {
  nextPage: boolean,
  post: IPost[]
}
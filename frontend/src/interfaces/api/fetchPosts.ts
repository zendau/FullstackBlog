import { IPost } from "../IPost";

export default interface IFetchPosts {
  nextPage: boolean,
  post: IPost[]
}
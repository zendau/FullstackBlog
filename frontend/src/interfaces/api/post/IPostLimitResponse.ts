import { IPost } from '@/interfaces/IPost';
export interface IPostLimitResponse {
  nextPage: boolean
  posts: IPost[]
}
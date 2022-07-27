import { IPost } from '@/interfaces/post';

export interface IPostState  {
  post: IPost | null
  posts: IPost[]
  hasMore: boolean
}
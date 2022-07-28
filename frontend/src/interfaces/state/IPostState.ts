import { IPost } from '@/interfaces/post';

export interface IPostState  {
  post: IPost | null
  posts: IPost[]
  hasMore: boolean
  pageNumber: number
  limit: number
  isSearched: boolean
}
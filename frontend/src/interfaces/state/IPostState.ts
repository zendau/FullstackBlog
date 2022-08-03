import { IPost } from '@/interfaces/IPost';

export interface IPostState  {
  post: IPost | null
  posts: IPost[]
  hasMore: boolean
  pageNumber: number
  limit: number
  isSearched: boolean
}
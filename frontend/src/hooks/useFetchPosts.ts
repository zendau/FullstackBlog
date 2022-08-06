import { useEffect, useState } from "react";
import { useAction } from "./useAction";
import { useTypedSelector } from "./useTypedSelector";
import { useLazyGetLimitPostsQuery, useLazyGetLimitUserPostsQuery } from "@/redux/reducers/post/post.api";

export const usefetchPosts = (userId?: string) => {

  const [getLimitPosts] = useLazyGetLimitPostsQuery()
  const [getLimitUserPosts] = useLazyGetLimitUserPostsQuery()
  const { hasMore, limit, pageNumber, isSearched } = useTypedSelector(state => state.postState)
  const { setPageNumber, clearPosts } = useAction()

  const [isCleared, setIsCleared] = useState(false)

  useEffect(() => {
    setIsCleared(true)
    return () => {
      clearPosts()
      setPageNumber(1)
      
    }

  }, [limit])

  useEffect(() => {
    if (hasMore && !isSearched && isCleared) {
      if (userId) {
        getLimitUserPosts({
          userId,
          currentPage: pageNumber,
          limit
        })
      } else {
        getLimitPosts({
          currentPage: pageNumber,
          limit
        })
      }
    }
  }, [pageNumber, limit, hasMore, isSearched, isCleared])

}
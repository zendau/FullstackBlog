import { useContext, useEffect } from "react";
import { useAction } from "./useAction";
import { useTypedSelector } from "./useTypedSelector";
import { useLazyGetLimitPostsQuery } from "@/redux/reducers/post/post.api";

export const usefetchPosts = () => {

  const [getLimitPosts, { isLoading }] = useLazyGetLimitPostsQuery()
  const { hasMore, limit, pageNumber, isSearched } = useTypedSelector(state => state.postState)
  const { setPageNumber, clearPosts } = useAction()


  console.log('enter fetch', hasMore, isSearched, pageNumber, limit)
  useEffect(() => {

    return () => {
      clearPosts()
      setPageNumber(1)
    }

  }, [limit])

  useEffect(() => {
    console.log('trigger', hasMore, isSearched, pageNumber, limit)
    if (hasMore && !isSearched) {
      console.log('get query')
      getLimitPosts({
        currentPage: pageNumber, 
        limit
      })
    }


  }, [pageNumber, limit, hasMore, isSearched])

}
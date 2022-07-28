import { useContext, useEffect } from "react";
import { useAction } from "./useAction";
import { useTypedSelector } from "./useTypedSelector";
import { useLazyGetLimitPostsQuery } from "@/redux/reducers/post/post.api";

export const useFetchPosts = () => {

  const [getLimitPosts, {isLoading}] = useLazyGetLimitPostsQuery()
  const { hasMore, limit, pageNumber, isSearched } = useTypedSelector(state => state.postState)
  const { setPageNumber } = useAction()


  const { clearPost } = useAction()

  useEffect(() => {
    clearPost()
    setPageNumber(1)

  }, [limit])

  useEffect(() => {
    
    if (hasMore && !isSearched) {
      console.log('!!!!!!!!!!!1', pageNumber, isSearched)
      getLimitPosts({
        pageNumber, limit
      })
    }

    return () => {
      console.log('test exit')
    }

  }, [pageNumber, hasMore])

}
import { useContext, useEffect } from "react";
import { useAction } from "./useAction";
import { useTypedSelector } from "./useTypedSelector";
import { PageContext } from "../context/PageContext";
import { useLazyGetLimitPostsQuery } from "@/redux/reducers/post/post.api";

export const useFetchPosts = (currentPage: number) => {

  const [getLimitPosts, {isLoading}] = useLazyGetLimitPostsQuery()
  const { hasMore } = useTypedSelector(state => state.postState)

  const { limit, setPageNumber } = useContext(PageContext)

  const { clearPost } = useAction()

  useEffect(() => {
    clearPost()
    setPageNumber(1)

  }, [limit])

  useEffect(() => {

    if (hasMore) {
      getLimitPosts({
        currentPage, limit
      })
    }

  }, [currentPage, limit, hasMore])

}
import { useContext, useEffect } from "react";
import { useAction } from "./useAction";
import { useTypedSelector } from "./useTypedSelector";
import { PageContext } from "../context/PageContext";
import { clearPostStore } from "../redux/actions/PostAction";


export const useFetchPosts = (currentPage: number) => {

  const { getLimitPosts } = useAction()
  const { hasMore } = useTypedSelector(state => state.post)

  const { limit, setPageNumber } = useContext(PageContext)

  const { clearPostStore } = useAction()

  useEffect(() => {
    clearPostStore()
    setPageNumber(1)

  }, [limit])

  useEffect(() => {

    if (hasMore) {
      getLimitPosts(currentPage, limit)
    }

  }, [currentPage, limit, hasMore])

}
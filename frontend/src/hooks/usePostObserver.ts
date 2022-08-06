import React, { useCallback, useRef } from "react";
import { useAction } from "./useAction";
import { useTypedSelector } from "./useTypedSelector";

export const usePostObserver = () => {

  const { hasMore } = useTypedSelector(state => state.postState)
  const { incPageNumber } = useAction()
  const observer = useRef<IntersectionObserver>()
  const observerCallback = useCallback(node => {
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        incPageNumber()
      }
    })
    if (node) observer.current.observe(node)
  }, [hasMore])

  return observerCallback

}
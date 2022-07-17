import React, { useCallback, useRef } from "react";

export const usePostObserver = (setPageNumber: React.Dispatch<React.SetStateAction<number>>, hasMore: boolean | undefined) => {

  const observer = useRef<IntersectionObserver>()
  const observerCallback = useCallback(node => {
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPageNumber(prevPage => prevPage + 1)
      }
    })
    if (node) observer.current.observe(node)
  }, [])

  return observerCallback

}
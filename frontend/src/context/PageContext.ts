import React, { createContext, useContext } from 'react'

export type PageContextType = {
  pageNumber: number
  setPageNumber: React.Dispatch<React.SetStateAction<number>>
  limit: number
  setLimit: React.Dispatch<React.SetStateAction<number>>
}


export const PageContext = createContext<PageContextType>({
  pageNumber: 1,
  setPageNumber: page => console.warn('no page provider'),
  limit: 1,
  setLimit: limit => console.warn("no limit provider")
})

export const usePageContext = () => useContext(PageContext)
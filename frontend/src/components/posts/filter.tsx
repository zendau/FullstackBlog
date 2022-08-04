import React, { useContext, useEffect, useState } from 'react';

import "./filter.scss"

import { useAction } from '@/hooks/useAction';
import { useDebounce } from '@/hooks/useDebounce';
import { useSearchPostsQuery } from '@/redux/reducers/post/post.api';
import { useTypedSelector } from '@/hooks/useTypedSelector';

interface IFilter {
  filterType: string
  setFilterType: React.Dispatch<React.SetStateAction<string>>
  filterName: string
  setFilterName: React.Dispatch<React.SetStateAction<string>>
}

const Filter: React.FC<IFilter> = ({ setFilterType }) => {

  const [searchPost, setSearchPost] = useState('')
  const [filterStatus, setFilterStatus] = useState(false)

  const value = useDebounce(searchPost)
  const { data } = useSearchPostsQuery(value, {
    skip: value.length < 3
  })

  const { limit, isSearched } = useTypedSelector((state) => state.postState)
  const { clearPost, fetchPosts, setLimit, setPageNumber, setSearched } = useAction()

  useEffect(() => {

    if (data !== undefined) {
      console.log('1')
      clearPost()
      setSearched(true)
      fetchPosts(data)
    }

    console.log('data', data)

  }, [data])

  useEffect(() => {
    console.log('debounce value', value, value.length, isSearched)

    if (isSearched && value.length === 0) {
      console.log('test111')
      setSearched(false)
      console.log('2')
      clearPost()
      setPageNumber(1)
    }

  }, [value])


  function onChangeValue(event: any) {
    console.log("change type")
    setFilterType(event.target.value)
  }

  function onSelectValue(event: any) {
    setLimit(parseInt(event.target.value))
  }

  function test(e: any) {

    console.log('value', value)
  }

  return (
    <section className="filter-container">

      <div className="filter__panel">
        <button onClick={() => setFilterStatus(!filterStatus)} className={filterStatus ? "btn filter__show filter__show--active" : "btn filter__show"}>Filters</button>
        <div className={filterStatus ? "filter__body filter__body--active" : "filter__body"}>
          <div className="filter__search">
            <label htmlFor="filterSearch">Search by title:</label>
            <input id="filterSearch" type="text" value={searchPost} onChange={(e) => setSearchPost(e.target.value)} />
          </div>

          <div className="filter__sort" onChange={onChangeValue}>
            <p>Sort by type</p>

            <input type="radio" id="sortDate"
              name="sortType" value="date" />
            <label htmlFor="sortDate">By date</label>

            <input type="radio" id="sortTitle"
              name="sortType" value="titleName" />
            <label htmlFor="sortTitle">By title name</label>

            <input type="radio" id="sortAuthor"
              name="sortType" value="authorName" />
            <label htmlFor="sortAuthor">By author name</label>
          </div>

          <div className="filter__limit">
            <label htmlFor="filterLimit">Post on page:</label>
            <select value={limit.toString()} id="filterLimit" onChange={onSelectValue}>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
              <option value={20}>20</option>
              <option value={0}>All</option>
            </select>
          </div>
        </div>
      </div>

    </section>
  );
};

export default Filter;
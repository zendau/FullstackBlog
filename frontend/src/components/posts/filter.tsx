import "./filter.scss"
import React, { useEffect, useState } from 'react';

import { useAction } from '@/hooks/useAction';
import { useDebounce } from '@/hooks/useDebounce';
import { useSearchPostsQuery } from '@/redux/reducers/post/post.api';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { isApiError } from '@/utils/isApiError';

interface IFilter {
  filterType: string
  setFilterType: React.Dispatch<React.SetStateAction<string>>
  filterName: string
  setFilterName: React.Dispatch<React.SetStateAction<string>>
}

const Filter: React.FC<IFilter> = ({ setFilterType, filterType }) => {

  const [searchPost, setSearchPost] = useState('')
  const [filterStatus, setFilterStatus] = useState(false)

  const value = useDebounce(searchPost)
  const { data } = useSearchPostsQuery(value, {
    skip: value.length < 3
  })

  const { limit, isSearched } = useTypedSelector((state) => state.postState)
  const { clearPosts, fetchPosts, setLimit, setPageNumber, setSearched } = useAction()

  useEffect(() => {

    if (data !== undefined && !isApiError(data)) {
      clearPosts()
      setSearched(true)
      fetchPosts(data)
    }
  }, [data])

  useEffect(() => {

    if (isSearched && value.length === 0) {
      setSearched(false)
      clearPosts()
      setPageNumber(1)
    }

  }, [value])


  function onChangeValue(event: any) {
    setFilterType(event.target.value)
  }

  function onSelectValue(event: any) {
    setLimit(parseInt(event.target.value))
  }

  function resetFilter() {
    setSearchPost('')
    setFilterType('')
    setLimit(5)
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

          <div className="filter__sort">
            <p>Sort by type</p>

            <input type="radio" id="sortDate"
              name="sortType" value="date" checked={filterType === 'date'} onChange={onChangeValue} />
            <label htmlFor="sortDate">By date</label>

            <input type="radio" id="sortTitle"
              name="sortType" value="titleName" checked={filterType === 'titleName'} onChange={onChangeValue} />
            <label htmlFor="sortTitle">By title name</label>

            <input type="radio" id="sortAuthor"
              name="sortType" value="authorName" checked={filterType === 'authorName'} onChange={onChangeValue} />
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
          <button className="btn btn__filter" onClick={resetFilter}>Reset</button>
        </div>
      </div>

    </section>
  );
};

export default Filter;
import React, { useContext, useState } from 'react';

import "./filter.scss"
import { PageContext } from "../../context/PageContext";
import { clearPostStore } from "../../redux/actions/PostAction";

interface IFilter {
  filterType: string
  setFilterType: React.Dispatch<React.SetStateAction<string>>
  filterName: string
  setFilterName: React.Dispatch<React.SetStateAction<string>>
}

const Filter: React.FC<IFilter> = ({ filterName, setFilterName, filterType, setFilterType }) => {

  const [filterStatus, setFilterStatus] = useState(false)

  const { setLimit, limit, setPageNumber } = useContext(PageContext)

  function onChangeValue(event: any) {
    console.log("change type")
    setFilterType(event.target.value)
  }

  function onSelectValue(event: any) {
    setLimit(event.target.value)
  }

  return (
    <section className="filter-container">

      <div className="filter__panel">
        <button onClick={() => setFilterStatus(!filterStatus)} className={filterStatus ? "btn filter__show filter__show--active" : "btn filter__show"}>Filters</button>
        <div className={filterStatus ? "filter__body filter__body--active" : "filter__body"}>
          <div className="filter__search">
            <label htmlFor="filterSearch">Search by title:</label>
            <input id="filterSearch" type="text" value={filterName} onChange={(e) => setFilterName(e.target.value)} />
          </div>

          <div className="filter__sort" onChange={onChangeValue}>
            <p>Sort by type</p>

            <input type="radio" id="sortDate"
              name="sortType" value="date" />
            <label htmlFor="sortDate">By date</label>

            <input type="radio" id="sortTitle"
              name="sortType" value="titleName" defaultChecked={true} />
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
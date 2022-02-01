import { useState } from "react";
import "./Filters.css";

function Filters(props) {
  const [filterIsOpen, setFilterIsOpen] = useState(false);

  const toggleFilter = () => {
    setFilterIsOpen((prev) => !prev);
  };

  const onFiltersClickhandler = (e) => {
    if (e.target.dataset.value) {
      props.onFilterValue(e.target.dataset.value);
    }
  };

  return (
    <div className="filters">
      <div onClick={toggleFilter} className="filterTop">
        <span>Filter</span>
        <img
          className={filterIsOpen ? "rotate" : ""}
          src={"/static/images/icon-arrow-down.svg"}
          alt=""
        />
      </div>

      {filterIsOpen && (
        <div onClick={onFiltersClickhandler} className="filterList">
          <p data-value="all">All</p>
          <p data-value="paid">Paid</p>
          <p data-value="pending">Pending</p>
          <p data-value="draft">Draft</p>
        </div>
      )}
    </div>
  );
}

export default Filters;

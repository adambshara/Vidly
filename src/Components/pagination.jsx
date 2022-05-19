import React from "react";
import _ from "lodash";

const Pagination = (props) => {
  const { itemsCount, pageSize, currentPage, onPageChange } = props;
  console.log(currentPage);

  const pagesCount = Math.ceil(itemsCount / pageSize);
  //we used math.ceil because we want to make sure that
  //if there 10 items in one page o need t make new pages
  if (pagesCount === 1) return null;

  const pages = _.range(1, pagesCount + 1);
  //we add +1 because if the pages are 3 it's gonna show only 2
  //that's why we add +1
  return (
    <nav>
      <ul className="pagination mt-3">
        {pages.map((page) => (
          <li
            key={page}
            className={page === currentPage ? "page-item active " : "page-item"}
          >
            <a className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
export default Pagination;

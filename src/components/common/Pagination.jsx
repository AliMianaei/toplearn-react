import React from 'react';
import { range } from 'lodash';

const Pagination = ({totalCourse, currentPage, perPage, onPageChange}) => {
  const pageCount = Math.ceil(totalCourse / perPage);
  if (pageCount === 1) return null;
  const pages = range(1, pageCount + 1);

    return (  
        <nav aria-label="Page navigation">
        <ul className="pagination justify-content-center">
            <li className="page-item">
              <a className="page-link" href="#" aria-label="Previous">
                <span aria-hidden="true"><i className="zmdi zmdi-chevron-right"></i></span>
              </a>
            </li>
            {/* <li className="page-item"><a className="page-link" href="#">1</a></li>
            <li className="page-item"><a className="page-link" href="#">2</a></li>
            <li className="page-item"><a className="page-link" href="#">3</a></li> */}
            {pages.map(page => (
              <li key={page} className={page === currentPage ? "page-item active" : "page-item"}>
                <a className="page-link" style={{cursor:'pointer'}} onClick={() => onPageChange(page)}>
                  {page}
                </a>
              </li>
            ))}
            <li className="page-item">
              <a className="page-link" href="#" aria-label="Next">
                <span aria-hidden="true"><i className="zmdi zmdi-chevron-left"></i></span>
              </a>
            </li>
        </ul>
    </nav>
    );
}
 
export default Pagination;
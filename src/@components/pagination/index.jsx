import classNames from "classnames";
import React, { Fragment } from "react";
import { ChevronLeft, ChevronRight } from "react-feather";
import ReactPaginate from "react-paginate";

export default function Pagination({ pages, action, disabled }) {
  return (
    <Fragment>
      <div
        className="d-flex justify-content-end"
        style={{ paddingRight: "10px", paddingLeft: "10px" }}
      >
        <ReactPaginate
          previousLabel={<ChevronLeft size={15} />}
          nextLabel={<ChevronRight size={15} />}
          forcePage={pages.page_number - 1}
          onPageChange={(page) => !disabled && action(page.selected + 1)}
          pageCount={pages.total_pages}
          breakLabel={"..."}
          pageRangeDisplayed={6}
          marginPagesDisplayed={2}
          activeClassName={"active"}
          pageClassName={"page-item"}
          nextLinkClassName={classNames("page-link ", {
            opacity_low: disabled,
          })}
          nextClassName={"page-item next"}
          previousClassName={"page-item prev"}
          previousLinkClassName={classNames("page-link ", {
            opacity_low: disabled,
          })}
          pageLinkClassName={classNames("page-link ", {
            opacity_low: disabled,
          })}
          breakClassName={"page-item"}
          breakLinkClassName={classNames("page-link ", {
            opacity_low: disabled,
          })}
          containerClassName={
            "pagination react-paginate separated-pagination  justify-content-end pr-1 mt-1"
          }
        />
      </div>
    </Fragment>
  );
}

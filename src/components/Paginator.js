import React from 'react';
import Pagination from "react-js-pagination";

const Paginator = ({ setPage, dataPagination}) => {
    const { current_page, total, per_page } = dataPagination;

    if (typeof current_page !== "undefined") {
        return (
            <Pagination
                activePage={current_page}
                itemsCountPerPage={per_page}
                totalItemsCount={total}
                pageRangeDisplayed={5}
                onChange={(pageNumber) => setPage(pageNumber)}
                itemClass="page-item"
                linkClass="page-link"
                activeClass="active"
            />
        );
    } else {
        return null;
    }
}

export default Paginator;
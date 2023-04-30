import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { usePostDataContext, usePostDataLoadContext } from '../../providers/PostDataProvider';
import './Pagination.css';

function Pagination() {
    const [pageNumber, setPageNumber] = useState(0);
    const [prevPageNumber, setPrevPageNumber] = useState(null);
    const [nextPageNumber, setNextPageNumber] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const data = usePostDataContext();
    const getData = usePostDataLoadContext();

    const maxPagesQuickAccess = 3;

    const updatePage = (page) => {
        if (!isLoading) {
            // if (!(page in data.paginator)) setIsLoading(true);
            getData.getPageData(page);
        }
    }

    useEffect(() => {
        console.log('data.isLoading:', data.isLoading);
        setIsLoading(data.isLoading);
    }, [data.isLoading]);

    useEffect(() => {
        console.log('data.paginator:', data.paginator);
        setPageNumber(data.paginator.current_page);
        setPrevPageNumber(data.paginator.page_prev);
        setNextPageNumber(data.paginator.page_next);
    }, [data.paginator]);

    const getPage = ({ page=1, decorate=false, activePage=null, baseClass='page', label=null } = {}) => {
        let className = baseClass;

        if (decorate) {
            if (page === activePage) {
                className += ' active';
                if (isLoading) className += ' loading';
            }
            if (Math.abs(page - activePage) > 1) className += ' tail';
        }

        if (!label) label = page;

        return (
            <Link
                onClick={() => updatePage(page)} key={'page-' + page}
                className={className} >
                {label}
            </Link>
        );
    }

    const getDivisor = () => {
        return (<span className="extra">&hellip;</span>);
    }

    const getPrev = () => {
        console.log(prevPageNumber);
        if (prevPageNumber) {
            return getPage({ page: pageNumber - 1, baseClass: 'previous', label: 'Prev' });
        } else {
            return getPage({ page: pageNumber - 1, baseClass: 'previous disabled', label: 'Prev' });
        }
    }

    const getNext = () => {
        console.log(nextPageNumber);
        if (nextPageNumber) {
            return getPage({ page: pageNumber + 1, baseClass: 'next', label: 'Next' });
        } else {
            return getPage({ page: pageNumber + 1, baseClass: 'next disabled', label: 'Next' });
        }
    }

    const getPages = () => {
        const output = [];
        const startPage = Math.max(1, pageNumber - maxPagesQuickAccess + 1);
        const endPage = Math.min(data.paginator.total_pages, pageNumber + maxPagesQuickAccess - 1);

        if (startPage > 3) {
            output.push(getPage({ page: 1 }));
            output.push(getDivisor());
        } else if (startPage > 2) {
            output.push(getPage({ page: 1 }));
            output.push(getPage({ page: 2 }));
        } else if (startPage > 1) {
            output.push(getPage({ page: 1 }));
        }

        for (let i = startPage; i <= endPage; i++) {
            output.push(getPage({ page: i, decorate: true, activePage: pageNumber }));
        }

        if (data.paginator.total_pages - pageNumber > 4) {
            output.push(getDivisor());
            output.push(getPage({ page: data.paginator.total_pages }));
        } else if (data.paginator.total_pages - pageNumber > 3) {
            output.push(getPage({ page: data.paginator.total_pages - 1 }));
            output.push(getPage({ page: data.paginator.total_pages }));
        } else if (data.paginator.total_pages - pageNumber > 2) {
            output.push(getPage({ page: data.paginator.total_pages }));
        }

        return output;
    }

    return (
        <footer>
            <div className="pagination">
                {getPrev()}
                {getPages()}
                {getNext()}
            </div>
        </footer>
    )
}

export default Pagination
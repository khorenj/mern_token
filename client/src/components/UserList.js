import React, {useState, useMemo, useEffect} from 'react';
import {useHttp} from "../hooks/http.hook";
import { useTable, useSortBy, usePagination, useGlobalFilter, useFilters } from "react-table";

import "../css/dataTable.css";

export const UsersList = ({loggedInUserType, users}) =>
{
    const {loading, request} = useHttp();

    const adminColumns = [
        {
            Header: "Email",
            accessor: "email"
        },
        {
            Header: "Name",
            accessor: "name"
        }
    ];

    const columns = useMemo(
        () => adminColumns,
        []
    );

    const data = useMemo(
        () => users,
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize },
        prepareRow,
        state,
        setGlobalFilter
    } = useTable({
        columns,
        data,
    },useFilters, useGlobalFilter,useSortBy,usePagination);

    const {globalFilter} = state;


    useEffect(()=>{
        window.M.AutoInit();
    },[]);


    if(!users.length)
    {
        return (
            <p className="center">No Users</p>
        )
    }

    return(

        <>
            <div className="card material-table">

                <div className="table-header">
                    <span className="table-title">Users List</span>

                    <div className="actions">
                        <input value={globalFilter || ''} onChange={(e) => setGlobalFilter(e.target.value)}/>
                        <span><i className="material-icons">search</i></span>
                    </div>
                </div>

                <table {...getTableProps()}>
                    <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column,i) => (
                                <th key={i}>
                                    <div {...column.getHeaderProps(column.getSortByToggleProps())}>
                                        {column.render("Header")}
                                        <span>{column.isSorted? (column.isSortedDesc? '↓':'↑'):''}</span>
                                    </div>

                                    <div>
                                        {(column.canFilter && column.Filter) ? column.render("Filter"):null}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                    {page.map((row, i) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()} key={i}>
                                {row.cells.map((cell) => {
                                    return <td  {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                                })}
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
                <div className="pagination table-footer">

                    <label>
                        Page {' '}
                        <label>
                            {pageIndex + 1} of {pageOptions.length}
                        </label>{' '}
                    </label>
                    <select
                        value={pageSize}
                        onChange={e => {
                            setPageSize(Number(e.target.value))
                        }}
                    >
                        {[10, 20, 30, 40, 50].map(pageSize => (
                            <option key={pageSize} value={pageSize}>
                                Show {pageSize}
                            </option>
                        ))}
                    </select>
                    <ul className="material-pagination">
                        <li className="paginate_button">
                            <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                                <i className="material-icons">chevron_left</i>
                            </button>
                        </li>
                        <li className="paginate_button">
                            <button onClick={() => nextPage()} disabled={!canNextPage}>
                                <i className="material-icons">chevron_right</i>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>


        </>

    )
}
import React, { useMemo } from 'react';
import { useTable, usePagination, useSortBy, useFilters } from 'react-table';

import { makeStyles } from '@material-ui/core/styles';
import { Box, Table, TableBody, TableCell, TableHead, TableRow, TableFooter, TableSortLabel } from '@material-ui/core';

import Pagination from './Pagination';
import ActionBar from './ActionBar';
import FilterFunctions from './filterFunctions';
import SortFunctions from './sortFunctions';
import { Filters } from './index';

const useStyles = makeStyles(theme => ({
    wrapper: {
        width: '100%',
        overflowX: 'scroll'
    },
    table: {
        background: theme.palette.background.paper
    },
    tableRow: {},
    tableHead: {
        background: '#000000'
    },
    tableHeadCell: {
        color: '#ffffff !important',
        fontWeight: 'bold'
    },
    tableHeadSortIcon: {
        color: '#ffffff !important'
    },
    tableCell: {},
    tableFooter: {}
}));

const _Table = ({ columns, data, config }) => {
    const classes = useStyles();

    const defaultColumn = React.useMemo(
        () => ({
            // Let's set up our default Filter UI
            ...Filters.Disabled
        }),
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        pageSize,
        pageIndex,
        flatHeaders
    } = useTable(
        {
            columns,
            data,
            filterTypes: FilterFunctions,
            sortTypes: SortFunctions,
            defaultColumn,
            defaultCanFilter: false
        },
        useFilters,
        useSortBy,
        usePagination
    );

    return (
        <Box className={classes.wrapper}>
            <Table {...getTableProps()} className={classes.table}>
                <TableRow>
                    <TableCell colSpan={columns.length}>
                        <ActionBar columns={flatHeaders} />
                    </TableCell>
                </TableRow>
                <TableHead className={classes.tableHead}>
                    {headerGroups.map(headerGroup => (
                        <TableRow {...headerGroup.getHeaderGroupProps()} className={classes.tableRow}>
                            {headerGroup.headers.map(column => (
                                <TableCell
                                    {...column.getHeaderProps(column.getSortByToggleProps())}
                                    className={classes.tableHeadCell}
                                >
                                    <TableSortLabel
                                        active={column.isSorted}
                                        direction={column.isSortedDesc ? 'desc' : 'asc'}
                                        classes={{
                                            root: classes.tableHeadCell,
                                            active: classes.tableHeadCellActive,
                                            icon: classes.tableHeadSortIcon
                                        }}
                                    >
                                        {column.render('Header')}
                                    </TableSortLabel>
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableHead>
                <TableBody {...getTableBodyProps()}>
                    {page.map((row, i) => {
                        prepareRow(row);
                        return (
                            <TableRow {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return <TableCell {...cell.getCellProps()}>{cell.render('Cell')}</TableCell>;
                                })}
                            </TableRow>
                        );
                    })}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={columns.length}>
                            <Pagination
                                canPreviousPage={canPreviousPage}
                                canNextPage={canNextPage}
                                pageCount={pageCount}
                                gotoPage={gotoPage}
                                nextPage={nextPage}
                                previousPage={previousPage}
                                setPageSize={setPageSize}
                                pageOptions={pageOptions}
                                pageSize={pageSize}
                                pageIndex={pageIndex}
                                items={data.length}
                            />
                        </TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </Box>
    );
};

export default _Table;

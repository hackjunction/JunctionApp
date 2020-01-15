import React from 'react'
import {
    useTable,
    usePagination,
    useSortBy,
    useFilters,
    useRowSelect,
} from 'react-table'

import { makeStyles, darken } from '@material-ui/core/styles'
import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TableFooter,
    Typography,
    TableSortLabel,
    Checkbox,
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import Empty from 'components/generic/Empty'

import Pagination from './Pagination'
import ActionBar from './ActionBar'
import FilterFunctions from './filterFunctions'
import SortFunctions from './sortFunctions'
import TableTitle from './TableTitle'
import { Filters } from './index'

const useStyles = makeStyles(theme => ({
    wrapper: {
        width: '100%',
        overflowX: 'scroll',
        position: 'relative',
    },
    table: {
        background: theme.palette.background.paper,
    },
    tableRow: ({ onRowClick }) => {
        const baseStyles = {}
        const clickableStyles = {
            cursor: 'pointer',
            '&:hover': {
                background: 'rgba(0,0,0,0.05)',
                transition: 'all 0.2s ease',
            },
        }
        if (typeof onRowClick === 'function') {
            return {
                ...baseStyles,
                ...clickableStyles,
            }
        } else {
            return baseStyles
        }
    },
    tableHead: {
        background: darken(theme.palette.primary.main, 0.3),
    },
    tableHeadRow: {},
    tableHeadCell: {
        color: 'white !important',
        fontWeight: 'bold',
        fontSize: '12px',
        lineHeight: '14px',
        whiteSpace: 'nowrap',
        transition: 'color 0.2s ease',
    },
    tableHeadCellActive: {
        color: `white !important`,
    },
    tableHeadSortIcon: {
        color: `white !important`,
    },
    tableCell: {},
    tableFooter: {},
}))

const _Table = ({ columns, data, onRowClick }) => {
    const classes = useStyles({ onRowClick })
    const defaultColumn = React.useMemo(
        () => ({
            // Let's set up our default Filter UI
            ...Filters.Disabled,
        }),
        []
    )

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
        flatHeaders,
        selectedFlatRows,
        state: { selectedRowIds },
    } = useTable(
        {
            columns,
            data,
            filterTypes: FilterFunctions,
            sortTypes: SortFunctions,
            defaultColumn,
            defaultCanFilter: false,
        },
        useFilters,
        useSortBy,
        usePagination,
        useRowSelect,
        hooks => {
            hooks.flatColumns.push(columns => [
                // Let's make a column for selection
                {
                    id: 'selection',
                    // The header can use the table's getToggleAllRowsSelectedProps method
                    // to render a checkbox
                    Header: ({ getToggleAllRowsSelectedProps }) => (
                        <div>
                            <Checkbox
                                color="primary"
                                {...getToggleAllRowsSelectedProps()}
                            />
                        </div>
                    ),
                    // The cell can use the individual row's getToggleRowSelectedProps method
                    // to the render a checkbox
                    Cell: ({ row }) => (
                        <div onClick={e => e.stopPropagation()}>
                            <Checkbox
                                color="primary"
                                {...row.getToggleRowSelectedProps()}
                            />
                        </div>
                    ),
                },
                ...columns,
            ])
        }
    )

    const isEmpty = !data || data.length === 0

    if (isEmpty) {
        return <Empty isEmpty />
    } else {
        return (
            <React.Fragment>
                <TableTitle
                    pageIndex={pageIndex}
                    pageSize={pageSize}
                    totalItems={data.length}
                />
                <ActionBar columns={flatHeaders} selected={selectedRowIds} />
                <Box className={classes.wrapper}>
                    <Table {...getTableProps()} className={classes.table}>
                        <TableHead className={classes.tableHead}>
                            {headerGroups.map(headerGroup => (
                                <TableRow
                                    {...headerGroup.getHeaderGroupProps()}
                                    className={classes.tableHeadRow}
                                >
                                    {headerGroup.headers.map(column => (
                                        <TableCell
                                            {...column.getHeaderProps(
                                                column.getSortByToggleProps()
                                            )}
                                        >
                                            <TableSortLabel
                                                active={column.isSorted}
                                                direction={
                                                    column.isSortedDesc
                                                        ? 'desc'
                                                        : 'asc'
                                                }
                                                classes={{
                                                    root: classes.tableHeadCell,
                                                    active:
                                                        classes.tableHeadCellActive,
                                                    icon:
                                                        classes.tableHeadSortIcon,
                                                }}
                                                IconComponent={ExpandMoreIcon}
                                            >
                                                <Typography variant="overline">
                                                    {column.render('Header')}
                                                </Typography>
                                            </TableSortLabel>
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableHead>
                        <TableBody {...getTableBodyProps()}>
                            {page.map((row, i) => {
                                prepareRow(row)
                                return (
                                    <TableRow
                                        {...row.getRowProps()}
                                        className={classes.tableRow}
                                        onClick={() => onRowClick(row)}
                                    >
                                        {row.cells.map(cell => {
                                            return (
                                                <TableCell
                                                    {...cell.getCellProps()}
                                                >
                                                    {cell.render('Cell')}
                                                </TableCell>
                                            )
                                        })}
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                        {/* <TableFooter>
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
                        </TableFooter> */}
                    </Table>
                </Box>
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
            </React.Fragment>
        )
    }
}

_Table.defaultProps = {
    data: [],
    columns: [],
    onRowClick: () => {},
}

export default _Table

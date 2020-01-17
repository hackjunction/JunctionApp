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
import PageSizeSelect from './PageSizeSelect'
import { Filters, Sorters } from './index'

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

const _Table = ({ columns, data, onRowClick, bulkActions }) => {
    const classes = useStyles({ onRowClick })
    const defaultColumn = React.useMemo(
        () => ({
            // Let's set up our default Filter UI
            ...Filters.Disabled,
            ...Sorters.Disabled,
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
        selectedFlatRows,
        state: { pageSize, pageIndex },
    } = useTable(
        {
            columns,
            data,
            pageIndex: 0,
            pageSize: 10,
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
                <ActionBar selected={selectedFlatRows} actions={bulkActions} />
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
                                                active={
                                                    column.canSort &&
                                                    column.isSorted
                                                }
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
                                                hideSortIcon
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
                                                    onClick={e => {
                                                        if (
                                                            cell.column.id ===
                                                            'selection'
                                                        ) {
                                                            e.stopPropagation()
                                                        }
                                                    }}
                                                >
                                                    {cell.render('Cell')}
                                                </TableCell>
                                            )
                                        })}
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </Box>
                <PageSizeSelect pageSize={pageSize} setPageSize={setPageSize} />
            </React.Fragment>
        )
    }
}

_Table.defaultProps = {
    data: [],
    columns: [],
    onRowClick: () => {},
    bulkActions: [],
}

export default _Table

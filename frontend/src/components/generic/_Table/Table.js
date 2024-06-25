import React, { useCallback, useMemo } from 'react'
import {
    useTable,
    usePagination,
    useSortBy,
    useFilters,
    useRowSelect,
    useExpanded,
} from 'react-table'
import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
    TableSortLabel,
    Checkbox,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Empty from 'components/generic/Empty'
import Pagination from './Pagination'
import ActionBar from './ActionBar'
import FilterFunctions from './filterFunctions'
import { Filters, Sorters } from './index'

const _Table = ({
    columns,
    data,
    onRowClick,
    bulkActions,
    enablePagination,
    enableSelection,
    enableExport,
    renderExpanded,
}) => {
    const defaultColumn = useMemo(
        () => ({
            ...Filters.Disabled,
            ...Sorters.Disabled,
        }),
        [],
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
        flatHeaders,
        state: { pageSize, pageIndex },
    } = useTable(
        {
            columns,
            data,
            filterTypes: FilterFunctions,
            defaultColumn,
            defaultCanFilter: false,
            initialState: {
                pageIndex: 0,
                pageSize: enablePagination ? 10 : 100000,
            },
        },
        useFilters,
        useSortBy,
        useExpanded,
        usePagination,
        useRowSelect,
        hooks => {
            if (enableSelection) {
                hooks.columns.push(columns => [
                    {
                        id: 'selection',
                        Header: ({ getToggleAllRowsSelectedProps }) => (
                            <div>
                                <Checkbox
                                    color="primary"
                                    {...getToggleAllRowsSelectedProps()}
                                />
                            </div>
                        ),
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
        },
    )

    const handleRowClick = useCallback(
        row => {
            if (typeof renderExpanded === 'function') {
                row.toggleRowExpanded(!row.isExpanded)
            }

            if (typeof onRowClick === 'function') {
                onRowClick(row)
            }
        },
        [onRowClick, renderExpanded],
    )

    const pagination = enablePagination && data.length > 10 && (
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
    )

    const isEmpty = !data || data.length === 0

    const columnCount = useMemo(() => {
        let result = columns.length
        if (enableSelection) {
            result += 1
        }

        return result
    }, [columns.length, enableSelection])

    if (isEmpty) {
        return <Empty isEmpty />
    } else {
        return (
            <>
                {pagination}
                {enableSelection && (
                    <ActionBar
                        selected={selectedFlatRows}
                        actions={bulkActions}
                        enableExport={enableExport}
                        flatHeaders={flatHeaders}
                    />
                )}
                <Box className="w-full overflow-x-scroll relative">
                    <Table {...getTableProps()} className="bg-white">
                        <TableHead className="bg-gray-800">
                            {headerGroups.map(headerGroup => (
                                <TableRow
                                    {...headerGroup.getHeaderGroupProps()}
                                >
                                    {headerGroup.headers.map(column => (
                                        <TableCell
                                            {...column.getHeaderProps(
                                                column.getSortByToggleProps(),
                                            )}
                                            className="text-white font-bold text-xs whitespace-nowrap transition-colors duration-200"
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
                                                className="text-white"
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
                                    <React.Fragment key={row.id}>
                                        <TableRow
                                            {...row.getRowProps()}
                                            className={`${
                                                (onRowClick ||
                                                    renderExpanded) &&
                                                'cursor-pointer hover:bg-gray-100 transition-all duration-200'
                                            }`}
                                            onClick={() => handleRowClick(row)}
                                        >
                                            {row.cells.map(cell => (
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
                                            ))}
                                        </TableRow>
                                        {row.isExpanded && (
                                            <TableRow
                                                className="bg-gray-100"
                                                key={`${row.id}_expanded`}
                                            >
                                                <TableCell
                                                    colSpan={columnCount}
                                                >
                                                    {renderExpanded(row)}
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </React.Fragment>
                                )
                            })}
                        </TableBody>
                    </Table>
                </Box>
                {pagination}
            </>
        )
    }
}

_Table.defaultProps = {
    data: [],
    columns: [],
    onRowClick: () => {},
    bulkActions: [],
    enableExport: true,
    enablePagination: true,
    enableSelection: true,
}

export default _Table

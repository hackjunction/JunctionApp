import React, { useState, useCallback, useMemo } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import {
    Table,
    TableBody,
    TableCell,
    TableRow,
    TableHead,
    TableFooter,
    TablePagination,
    Box,
    Paper,
    CircularProgress,
    Checkbox,
} from '@material-ui/core'

import objectPath from 'object-path'

import TableToolbar from './TableToolbar'
import TablePaginationActions from './TablePaginationActions'
import ActionMenu from 'components/generic/ActionMenu'

const useTableStyles = makeStyles(theme => ({
    root: {
        overflowX: 'auto',
    },
}))

const usePaginationStyles = makeStyles(theme => ({
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        height: 'auto',
    },
}))

export default ({
    columns = [],
    dataSource = [],
    rowKey,
    loading = true,
    pagination = true,
    rowNumber = true,
    rowSelection = true,
    footer,
    title = '',
    selectedActions = [],
    rowActions = [],
}) => {
    const classes = useTableStyles()
    const paginationClasses = usePaginationStyles()
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [page, setPage] = useState(0)
    const [selectedRows, setSelectedRows] = useState([])

    const handleChangePage = useCallback((event, newPage) => {
        setPage(newPage)
    }, [])

    const handleChangeRowsPerPage = useCallback(event => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }, [])

    const handleSelectAll = useCallback(() => {
        if (selectedRows.length === dataSource.length) {
            setSelectedRows([])
        } else {
            setSelectedRows(dataSource.map(item => item[rowKey]))
        }
    }, [dataSource, rowKey, selectedRows])

    const handleSelectRow = item => {
        const key = item[rowKey]
        let rows = selectedRows.slice()
        const index = rows.indexOf(key)
        if (rows.indexOf(key) !== -1) {
            rows.splice(index, 1)
        } else {
            rows = rows.concat(key)
        }
        setSelectedRows(rows)
    }

    const isRowSelected = item => {
        return selectedRows.indexOf(item[rowKey]) !== -1
    }

    const columnCount = useMemo(() => {
        let columnCount = columns.length
        if (rowSelection) columnCount++
        if (rowNumber) columnCount++
        if (rowActions) columnCount++
        return columnCount
    }, [columns, rowSelection, rowActions, rowNumber])

    const data = useMemo(() => {
        return dataSource.slice(page * rowsPerPage, (page + 1) * rowsPerPage)
    }, [dataSource, page, rowsPerPage])

    const isAllSelected = useMemo(() => {
        if (!dataSource.length || loading) return false
        return selectedRows.length === dataSource.length
    }, [selectedRows, dataSource, loading])

    return (
        <>
            <Paper className={classes.root}>
                <TableToolbar
                    title={title}
                    selectedRows={selectedRows}
                    actions={selectedActions}
                />
                <Table>
                    <TableHead>
                        <TableRow>
                            {rowSelection && (
                                <TableCell
                                    padding="checkbox"
                                    key="rowSelection"
                                >
                                    <Checkbox
                                        color="primary"
                                        checked={isAllSelected}
                                        onChange={handleSelectAll}
                                    />
                                </TableCell>
                            )}
                            {rowNumber && (
                                <TableCell key="rowNumber">#</TableCell>
                            )}
                            {rowActions.length > 0 && (
                                <TableCell padding="checkbox" key="rowActions">
                                    Actions
                                </TableCell>
                            )}
                            {columns.map(column => (
                                <TableCell key={column.key}>
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading && (
                            <TableRow style={{ height: 200 }}>
                                <TableCell align="center" colSpan={columnCount}>
                                    <CircularProgress />
                                </TableCell>
                            </TableRow>
                        )}
                        {!loading && data.length === 0 && (
                            <TableRow style={{ height: 200 }}>
                                <TableCell align="center" colSpan={columnCount}>
                                    No data
                                </TableCell>
                            </TableRow>
                        )}
                        {!loading &&
                            data.length > 0 &&
                            data.map((item, index) => (
                                <TableRow key={item[rowKey]}>
                                    {rowSelection && (
                                        <TableCell
                                            padding="checkbox"
                                            key="rowSelection"
                                        >
                                            <Checkbox
                                                color="primary"
                                                checked={isRowSelected(item)}
                                                onChange={() =>
                                                    handleSelectRow(item)
                                                }
                                            />
                                        </TableCell>
                                    )}
                                    {rowNumber && (
                                        <TableCell key="rowNumber">
                                            {1 + index + page * rowsPerPage}
                                        </TableCell>
                                    )}
                                    {rowActions.length > 0 && (
                                        <TableCell
                                            padding="checkbox"
                                            key="rowActions"
                                        >
                                            <ActionMenu
                                                actions={rowActions}
                                                actionProps={[item]}
                                                title="Actions"
                                            />
                                        </TableCell>
                                    )}
                                    {columns.map(column => {
                                        const value = objectPath.get(
                                            item,
                                            column.path,
                                        )
                                        return (
                                            <TableCell key={column.key}>
                                                {column.render
                                                    ? column.render(value, item)
                                                    : value}
                                            </TableCell>
                                        )
                                    })}
                                </TableRow>
                            ))}
                    </TableBody>
                    {footer && (
                        <TableFooter>
                            <TableRow>
                                <TableCell colSpan={columnCount} align="right">
                                    {footer}
                                </TableCell>
                            </TableRow>
                        </TableFooter>
                    )}
                </Table>
            </Paper>
            {pagination && (
                <Box mt={1}>
                    <Paper>
                        <TablePagination
                            rowsPerPageOptions={[10, 25, 50]}
                            colSpan={columnCount}
                            count={dataSource.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            SelectProps={{
                                inputProps: { 'aria-label': 'rows per page' },
                                native: true,
                            }}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                            ActionsComponent={TablePaginationActions}
                            classes={paginationClasses}
                        />
                    </Paper>
                </Box>
            )}
        </>
    )
}

import React, { useCallback } from 'react';

import { Box, Typography, IconButton, TextField } from '@material-ui/core';

import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';

const Pagination = ({
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
    items
}) => {
    const handlePageSizeChange = useCallback(
        e => {
            setPageSize(Number(e.target.value));
        },
        [setPageSize]
    );

    return (
        <Box display="flex" flexDirection="row" justifyContent="space-between" flexWrap="wrap" alignItems="center">
            <Box>
                <TextField
                    style={{ width: '100px' }}
                    select
                    helperText="Items per page"
                    value={pageSize}
                    onChange={handlePageSizeChange}
                    margin="dense"
                    SelectProps={{
                        native: true
                    }}
                    variant="filled"
                >
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                    <option value={100000}>All</option>
                </TextField>
            </Box>
            <Box display="flex" flexDirection="row" alignItems="center">
                <IconButton disabled={!canPreviousPage} onClick={previousPage}>
                    <NavigateBeforeIcon />
                </IconButton>
                <Box p={1}>
                    <Typography variant="subtitle2">
                        Page {pageIndex + 1} of {pageCount}
                    </Typography>
                </Box>
                <IconButton disabled={!canNextPage} onClick={nextPage}>
                    <NavigateNextIcon />
                </IconButton>
            </Box>
        </Box>
    );
};

export default Pagination;

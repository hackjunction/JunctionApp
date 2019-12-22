import * as FilterTypes from './filterTypes'

export default {
    [FilterTypes.SINGLE_SELECT]: (rows, id, filterValue) => {
        if (!filterValue) return rows
        return rows.filter(row => row.values[id] === filterValue)
    },
    [FilterTypes.MULTIPLE_SELECT]: (rows, id, filterValue) => {
        if (!Array.isArray(filterValue) || filterValue.length === 0) return rows
        return rows.filter(row => filterValue.indexOf(row.values[id]) !== -1)
    },
    [FilterTypes.CONTAINS_SEARCH]: (rows, id, filterValue) => {
        return rows.filter(row => row.values[id]?.indexOf(filterValue) !== -1)
    },
    [FilterTypes.EXACT_SEARCH]: (rows, id, filterValue) => {
        return rows.filter(row => row.values[id] === filterValue)
    },
}

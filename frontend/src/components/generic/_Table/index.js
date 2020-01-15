import Table from './Table'
import * as SortTypes from './sortTypes'
import SortFunctions from './sortFunctions'
import SingleSelectFilter from './filters/SingleSelectFilter'
import MultipleSelectFilter from './filters/MultipleSelectFilter'
import ContainsSearchFilter from './filters/ContainsSearch'

const Filters = {
    SingleSelect: SingleSelectFilter,
    MultipleSelect: MultipleSelectFilter,
    ContainsSearch: ContainsSearchFilter,
    Disabled: {
        Filter: () => null,
        filter: null,
        canFilter: false,
    },
}

const Sorters = {
    Numeric: {
        sortType: SortTypes.SORT_NUMERIC,
        disableSortBy: false,
    },
    Alphabetic: {
        sortType: SortTypes.SORT_ALPHABETIC,
        disableSortBy: false,
    },
    Default: {
        disableSortBy: false,
    },
    Datetime: {
        sortType: 'datetime',
        disableSortBy: false,
    },
    Disabled: {
        disableSortBy: true,
    },
}

export { Table, Filters, Sorters }

import Table from './Table'
import * as SortFunctions from './sortFunctions'
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
        sortType: SortFunctions.Numeric,
        disableSortBy: false,
    },
    Alphabetic: {
        sortType: SortFunctions.Alphabetic,
        disableSortBy: false,
    },
    DateTime: {
        sortType: SortFunctions.DateTime,
        disableSortBy: false,
    },
    ArrayLength: {
        sortType: SortFunctions.ArrayLength,
        disableSortBy: false,
    },
    Disabled: {
        disableSortBy: true,
    },
    Default: {
        disableSortBy: false,
    },
}

export { Table, Filters, Sorters }

import Table from './Table'
import * as SortTypes from './sortTypes'
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
    Numeric: SortTypes.SORT_NUMERIC,
}

export { Table, Filters, Sorters }

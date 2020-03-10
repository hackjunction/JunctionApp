const _FilterTypes = require('../constants/filter-types')
const FilterFunctions = require('./filterFunctions')

const FilterTypes = _FilterTypes.filterTypes

const buildFiltersArray = filters => {
    return filters.map((filter = {}) => {
        switch (filter.type) {
            case FilterTypes.NOT_EMPTY.id: {
                return item => {
                    return !FilterFunctions.isEmpty(item, filter.path)
                }
            }
            case FilterTypes.IS_EMPTY.id: {
                return item => {
                    return FilterFunctions.isEmpty(item, filter.path)
                }
            }
            case FilterTypes.EQUALS.id: {
                return item => {
                    return FilterFunctions.isEqualTo(
                        item,
                        filter.path,
                        filter.value
                    )
                }
            }
            case FilterTypes.NOT_EQUALS.id: {
                return item => {
                    return !FilterFunctions.isEqualTo(
                        item,
                        filter.path,
                        filter.value
                    )
                }
            }
            case FilterTypes.ONE_OF.id: {
                return item => {
                    return FilterFunctions.isOneOf(
                        item,
                        filter.path,
                        filter.value
                    )
                }
            }
            case FilterTypes.NOT_ONE_OF.id: {
                return item => {
                    return !FilterFunctions.isOneOf(
                        item,
                        filter.path,
                        filter.value
                    )
                }
            }
            case FilterTypes.CONTAINS.id: {
                return item => {
                    return FilterFunctions.contains(
                        item,
                        filter.path,
                        filter.value
                    )
                }
            }
            case FilterTypes.NOT_CONTAINS.id: {
                return item => {
                    return !FilterFunctions.contains(
                        item,
                        filter.path,
                        filter.value
                    )
                }
            }
            case FilterTypes.CONTAINS_ONE_OF.id: {
                return item => {
                    return FilterFunctions.containsOneOf(
                        item,
                        filter.path,
                        filter.value
                    )
                }
            }
            case FilterTypes.NOT_CONTAINS_ONE_OF.id: {
                return item => {
                    return !FilterFunctions.containsOneOf(
                        item,
                        filter.path,
                        filter.value
                    )
                }
            }
            case FilterTypes.LESS_THAN.id: {
                return item => {
                    return !FilterFunctions.isGte(
                        item,
                        filter.path,
                        filter.value
                    )
                }
            }
            case FilterTypes.NOT_LESS_THAN.id: {
                return item => {
                    return FilterFunctions.isGte(
                        item,
                        filter.path,
                        filter.value
                    )
                }
            }
            case FilterTypes.MORE_THAN.id: {
                return item => {
                    return !FilterFunctions.isLte(
                        item,
                        filter.path,
                        filter.value
                    )
                }
            }
            case FilterTypes.NOT_MORE_THAN.id: {
                return item => {
                    return FilterFunctions.isLte(
                        item,
                        filter.path,
                        filter.value
                    )
                }
            }
            case FilterTypes.BOOLEAN_TRUE.id:
                return item => {
                    return FilterFunctions.isEqualTo(item, filter.path, true)
                }
            case FilterTypes.BOOLEAN_FALSE.id:
                return item => {
                    return FilterFunctions.isEqualTo(item, filter.path, false)
                }
            default:
                return () => true
        }
    })
}

const applyFilters = (items, filters) => {
    const filtersArray = buildFiltersArray(filters)

    return items.filter(item => {
        for (const filter of filtersArray) {
            if (!filter(item)) return false
        }
        return true
    })
}

module.exports = {
    applyFilters,
}

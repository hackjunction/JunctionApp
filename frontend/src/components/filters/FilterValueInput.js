import React from 'react'
import { FilterTypes, FilterValues } from '@hackjunction/shared'

import TextInput from 'components/inputs/TextInput'
import Select from 'components/inputs/SelectOld'

const MULTI_TYPES = [
    FilterTypes.filterTypes.ONE_OF.id,
    FilterTypes.filterTypes.NOT_ONE_OF.id,
    FilterTypes.filterTypes.CONTAINS_ONE_OF.id,
    FilterTypes.filterTypes.NOT_CONTAINS_ONE_OF.id,
]

const FilterValueInput = ({
    filterType,
    valueType,
    value,
    onChange,
    event,
}) => {
    const inputParams = { value, onChange }
    switch (filterType) {
        case FilterTypes.filterTypes.LESS_THAN.id:
        case FilterTypes.filterTypes.NOT_LESS_THAN.id:
        case FilterTypes.filterTypes.MORE_THAN.id:
        case FilterTypes.filterTypes.NOT_MORE_THAN.id:
            return (
                <TextInput
                    label="Enter a number"
                    helperText="If the field is a text field or a list of values, compares the length of the value"
                    {...inputParams}
                />
            )
        case FilterTypes.filterTypes.CONTAINS.id:
        case FilterTypes.filterTypes.NOT_CONTAINS.id:
        case FilterTypes.filterTypes.EQUALS.id:
        case FilterTypes.filterTypes.NOT_EQUALS.id:
        case FilterTypes.filterTypes.ONE_OF.id:
        case FilterTypes.filterTypes.NOT_ONE_OF.id:
        case FilterTypes.filterTypes.CONTAINS_ONE_OF.id:
        case FilterTypes.filterTypes.NOT_CONTAINS_ONE_OF.id:
            const isMulti = MULTI_TYPES.indexOf(filterType) !== -1
            switch (valueType) {
                case FilterValues.STRING:
                    if (isMulti) {
                        return (
                            <TextInput
                                label="Enter values (comma-separated)"
                                formatValue={value =>
                                    Array.isArray(value) ? value.join(',') : ''
                                }
                                formatOnChange={value => value.split(',')}
                                {...inputParams}
                            />
                        )
                    } else {
                        return (
                            <TextInput label="Enter value" {...inputParams} />
                        )
                    }
                case FilterValues.BOOLEAN:
                    return <TextInput label="Boolean field" {...inputParams} />
                case FilterValues.DATE:
                    return <TextInput label="Date field" {...inputParams} />
                case FilterValues.CUSTOM_QUESTION:
                    return (
                        <TextInput
                            label="Enter the answer"
                            placeholder="All data is stored as a string, to search for a boolean, write true/false"
                            {...inputParams}
                        />
                    )
                case FilterValues.GENDER:
                    return (
                        <Select
                            label="Select gender"
                            type="gender"
                            multiple={isMulti}
                            {...inputParams}
                        />
                    )
                case FilterValues.NATIONALITY:
                    return (
                        <Select
                            label="Select nationality"
                            type="nationality"
                            multiple={isMulti}
                            {...inputParams}
                        />
                    )
                case FilterValues.COUNTRY:
                    return (
                        <Select
                            label="Select country"
                            type="country"
                            multiple={isMulti}
                            {...inputParams}
                        />
                    )
                case FilterValues.LANGUAGE:
                    return (
                        <Select
                            label="Select language"
                            type="language"
                            multiple={isMulti}
                            {...inputParams}
                        />
                    )
                case FilterValues.TAG:
                    const options = event.tags.map(tag => ({
                        value: tag.label,
                        label: tag.label,
                    }))
                    return (
                        <Select
                            label="Select tag"
                            options={options}
                            multiple={isMulti}
                            {...inputParams}
                        />
                    )
                case FilterValues.STATUS:
                    return (
                        <Select
                            label="Select status"
                            type="status"
                            multiple={isMulti}
                            {...inputParams}
                        />
                    )
                case FilterValues.NUMBER:
                    return (
                        <TextInput
                            type="number"
                            label="Enter a number"
                            {...inputParams}
                        />
                    )
                default:
                    return null
            }
        case FilterTypes.filterTypes.IS_EMPTY:
        case FilterTypes.filterTypes.NOT_EMPTY:
        case FilterTypes.filterTypes.BOOLEAN_FALSE.id:
        case FilterTypes.filterTypes.BOOLEAN_TRUE.id:
            return null
        default:
            return null
    }
}

export default FilterValueInput

import React from 'react'
import { FilterTypes, FilterValues } from '@hackjunction/shared'

import TextInput from 'components/inputs/TextInput'
import Select from 'components/inputs/SelectOld'
import { useTranslation } from 'react-i18next';
const MULTI_TYPES = [
    FilterTypes.filterTypes.ONE_OF.id,
    FilterTypes.filterTypes.NOT_ONE_OF.id,
    FilterTypes.filterTypes.CONTAINS_ONE_OF.id,
    FilterTypes.filterTypes.NOT_CONTAINS_ONE_OF.id,
]
const { t, i18n } = useTranslation();
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
                                label={t('Enter_values_')}
                                formatValue={value =>
                                    Array.isArray(value) ? value.join(',') : ''
                                }
                                formatOnChange={value => value.split(',')}
                                {...inputParams}
                            />
                        )
                    } else {
                        return (
                            <TextInput label={t('Enter_value_')} {...inputParams} />
                        )
                    }
                case FilterValues.BOOLEAN:
                    return <TextInput label={t('Boolean_field_')}{...inputParams} />
                case FilterValues.DATE:
                    return <TextInput label={t('Date field')} {...inputParams} />
                case FilterValues.GENDER:
                    return (
                        <Select
                            label={t('Select_gender_')}
                            type="gender"
                            multiple={isMulti}
                            {...inputParams}
                        />
                    )
                case FilterValues.NATIONALITY:
                    return (
                        <Select
                            label={t('Select_nationality_')}
                            type="nationality"
                            multiple={isMulti}
                            {...inputParams}
                        />
                    )
                case FilterValues.COUNTRY:
                    return (
                        <Select
                            label={t('Select_country_')}
                            type="country"
                            multiple={isMulti}
                            {...inputParams}
                        />
                    )
                case FilterValues.LANGUAGE:
                    return (
                        <Select
                            label={t('Select_language_')}
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
                            label={t('Select_tag_')}
                            options={options}
                            multiple={isMulti}
                            {...inputParams}
                        />
                    )
                case FilterValues.STATUS:
                    return (
                        <Select
                            label={t('Select_status_')}
                            type="status"
                            multiple={isMulti}
                            {...inputParams}
                        />
                    )
                case FilterValues.NUMBER:
                    return (
                        <TextInput
                            type="number"
                            label={t('Enter_num_')}
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

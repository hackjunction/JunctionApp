import React, { useRef, useMemo, useCallback } from 'react'

import { Universities, Countries } from '@hackjunction/shared'
import { Grid } from '@material-ui/core'

import TextInput from 'components/inputs/TextInput'
import Select from 'components/inputs/Select'

const LEVEL_OPTIONS = [
    {
        value: 'Lower Secondary',
        label: 'Lower Secondary Education',
    },
    {
        value: 'Upper Secondary',
        label: 'Upper Secondary Education',
    },
    {
        value: 'Bachelor',
        label: 'Bachelor or Equivalent',
    },
    {
        value: 'Master',
        label: 'Master or Equivalent',
    },
    {
        value: 'Doctoral',
        label: 'Doctoral or Equivalent',
    },
    {
        value: 'Other Post-secondary',
        label: 'Other post-secondary education',
    },
    {
        value: 'None of the above',
        label: 'None of the above',
    },
]

const UNIVERSITY_LEVELS = ['Doctoral', 'Bachelor', 'Master']

const EducationInput = ({ value = {}, onChange, onBlur, autoFocus }) => {
    const selectEl = useRef(null)
    // const [country, setCountry] = useState()

    const fieldsDisabled = UNIVERSITY_LEVELS.indexOf(value.level) === -1

    const handleChange = useCallback(
        (fieldName, fieldValue) => {
            if (
                fieldName === 'level' &&
                UNIVERSITY_LEVELS.indexOf(fieldValue) === -1
            ) {
                onChange({
                    level: fieldValue,
                })
            } else {
                onChange({
                    ...value,
                    [fieldName]: fieldValue,
                })
            }
        },
        [value, onChange],
    )

    const universityOptions = useMemo(() => {
        const baseOptions = value.university
            ? [
                  {
                      label: value.university,
                      value: value.university,
                  },
              ]
            : []
        const countryOptions = Universities.getByAlpha2Code(
            Countries.alpha2CodeFromName(value?.country),
        )
            .map(uni => ({
                label: uni.name,
                value: uni.name,
            }))
            .filter(uni => {
                if (uni.label === value.university) {
                    return false
                }
                return true
            })

        return baseOptions.concat(countryOptions)
    }, [value])
    // TODO country isn't stored to the education model. Do fix.
    // console.log('counry here', value, country)
    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Select
                    autoFocus={autoFocus}
                    innerRef={selectEl}
                    label="Level of education"
                    placeholder="Choose one"
                    options={LEVEL_OPTIONS}
                    value={value.level}
                    onChange={level => handleChange('level', level)}
                />
            </Grid>
            {!fieldsDisabled && (
                <>
                    <Grid item xs={6}>
                        <Select
                            label="Country of study"
                            placeholder="Choose country"
                            options="country"
                            value={value?.country}
                            onChange={country =>
                                handleChange('country', country)
                            }
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Select
                            disabled={fieldsDisabled}
                            label="University"
                            placeholder={
                                value?.country
                                    ? 'Search for universities'
                                    : 'Choose a country first'
                            }
                            options={universityOptions}
                            value={value.university}
                            onChange={university =>
                                handleChange('university', university)
                            }
                            allowCreate
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextInput
                            disabled={fieldsDisabled}
                            label="Field of study"
                            helperText="E.g. Computer Science"
                            value={value.degree}
                            onChange={degree => handleChange('degree', degree)}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Select
                            disabled={fieldsDisabled}
                            label="Graduation year"
                            placeholder="Year of (expected) graduation."
                            options="year-future"
                            value={value.graduationYear}
                            onChange={graduationYear =>
                                handleChange('graduationYear', graduationYear)
                            }
                        />
                    </Grid>
                </>
            )}
        </Grid>
    )
}

export default EducationInput

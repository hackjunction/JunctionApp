import React, { useRef, useState, useMemo, useCallback } from 'react'

import { Universities, Countries } from '@hackjunction/shared'
import { Grid } from '@material-ui/core'

import TextInput from 'components/inputs/TextInput'
import Select from 'components/inputs/Select'
import { useTranslation } from 'react-i18next';
// TODO Level_options how to translate
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
    const [country, setCountry] = useState()
    const { t, i18n } = useTranslation();
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
        [value, onChange]
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
            Countries.alpha2CodeFromName(country)
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
    }, [country, value])

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Select
                    autoFocus={autoFocus}
                    innerRef={selectEl}
                    label={t('Education_level_')}
                    placeholder={t('Choose_one_')}
                    options={LEVEL_OPTIONS}
                    value={value.level}
                    onChange={level => handleChange('level', level)}
                />
            </Grid>
            {!fieldsDisabled && (
                <React.Fragment>
                    <Grid item xs={6}>
                        <Select
                            label={t('Country_study_')}
                            placeholder={t('Choose_country_')}
                            options="country"
                            value={country}
                            onChange={setCountry}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Select
                            disabled={fieldsDisabled}
                            label={t('University_')}
                            placeholder={
                                country
                                    ? t('Search_university_')
                                    : t('Choose_country_first_')
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
                            label={t('Field_of_study_')}
                            helperText={t('Eg_cs_')}
                            value={value.degree}
                            onChange={degree => handleChange('degree', degree)}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Select
                            disabled={fieldsDisabled}
                            label={t('Grad_year_')}
                            placeholder={t('Year_of_grad_')}
                            options="year-future"
                            value={value.graduationYear}
                            onChange={graduationYear =>
                                handleChange('graduationYear', graduationYear)
                            }
                        />
                    </Grid>
                </React.Fragment>
            )}
        </Grid>
    )
}

export default EducationInput

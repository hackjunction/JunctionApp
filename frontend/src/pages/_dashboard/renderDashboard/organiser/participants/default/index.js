import React, { useState, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { FilterHelpers, FilterValues } from '@hackjunction/shared'

import * as OrganiserSelectors from 'redux/organiser/selectors'

import Divider from 'components/generic/Divider'
import AttendeeTable from 'components/tables/AttendeeTable'
import FilterGroupMenu from 'components/filters/FilterGroupMenu'

/**
 * Creates a filter expression for the given custom question filter.
 * The function finds the path for the answer in the registration
 * and creates the explicit path to the answer object.
 */
const getCustomQuestionFilterResultForRegistration = (filter, registration) => {
    const [sectionName, questionName] =
        FilterHelpers.parseCustomQuestionFilterPath(filter.path)
    const customAnswerIndex = registration.answers.CustomAnswers?.findIndex(
        customAnswer =>
            customAnswer.key === questionName &&
            customAnswer.section === sectionName,
    )

    const customQuestionAnswerPath = `answers.CustomAnswers.${customAnswerIndex}.value`

    return FilterHelpers.getFilterFunction({
        ...filter,
        path: customQuestionAnswerPath,
    })(registration)
}

/**
 * Separates the filters into "normal" and "custom" filters.
 * Custom question filters use a specific `path` structure
 * that does not work with regular filtering
 */
const partitionFilters = filters =>
    filters.reduce(
        (acc, filter) => {
            if (filter.valueType === FilterValues.CUSTOM_QUESTION) {
                acc.customQuestionFilters.push(filter)
            } else {
                acc.normalFieldFilters.push(filter)
            }

            return acc
        },
        { normalFieldFilters: [], customQuestionFilters: [] },
    )

export default () => {
    const registrations = useSelector(OrganiserSelectors.registrations)

    const [filters, setFilters] = useState([])
    const { normalFieldFilters, customQuestionFilters } = useMemo(
        () => partitionFilters(filters),
        [filters],
    )

    const filtered = FilterHelpers.applyFilters(
        registrations,
        normalFieldFilters,
    ).filter(registration => {
        if (!customQuestionFilters) return true

        return customQuestionFilters
            .map(filter =>
                getCustomQuestionFilterResultForRegistration(
                    filter,
                    registration,
                ),
            )
            .every(passesFilter => !!passesFilter)
    })

    return (
        <>
            <FilterGroupMenu onChange={setFilters} />
            <Divider size={1} />
            <AttendeeTable attendees={filtered} />
        </>
    )
}

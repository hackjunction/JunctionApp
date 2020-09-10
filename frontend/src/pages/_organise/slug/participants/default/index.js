import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { FilterHelpers } from '@hackjunction/shared'

import * as OrganiserSelectors from 'redux/organiser/selectors'

import Divider from 'components/generic/Divider'
import AttendeeTable from 'components/tables/AttendeeTable'
import FilterGroupMenu from 'components/filters/FilterGroupMenu'

export default () => {
    const registrations = useSelector(OrganiserSelectors.registrations)
    const registrationsLoading = useSelector(
        OrganiserSelectors.registrationsLoading,
    )

    const [filters, setFilters] = useState([])
    const filtered = FilterHelpers.applyFilters(registrations, filters)

    return (
        <>
            <FilterGroupMenu onChange={setFilters} />
            <Divider size={1} />
            <AttendeeTable
                attendees={filtered}
                loading={registrationsLoading}
            />
        </>
    )
}

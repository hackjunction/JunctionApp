import React, { useState, useCallback, useMemo, useEffect } from 'react'
import moment from 'moment'
import { push } from 'connected-react-router'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'

import { Box } from '@material-ui/core'
import Rating from '@material-ui/lab/Rating'
import StatusBadge from 'components/generic/StatusBadge'
import Tag from 'components/generic/Tag'

import * as OrganiserSelectors from 'redux/organiser/selectors'
import EditRegistrationModal from 'components/modals/EditRegistrationModal'
import BulkEditRegistrationModal from 'components/modals/BulkEditRegistrationModal'
import BulkEmailModal from 'components/modals/BulkEmailModal'

import { Table, Filters, Sorters } from 'components/generic/_Table'
import { CSVLink } from 'react-csv'
import _ from 'lodash'
import { flattenObject } from 'utils/dataModifiers'

//Necessary for the CSV export
const skipArray = ['_id', '__v', 'section', 'key', 'id', 'checklist']
const stringEscapeArray = [
    'firstName',
    'lastName',
    'motivation',
    'headline',
    'cityOfResidence',
    'biography',
    'cityOfTravel',
]

export default ({
    emptyRenderer,
    attendees = [],
    footer = null,
    title = 'Participants',
    minimal = false,
}) => {
    const dispatch = useDispatch()
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)
    const organiserProfilesMap = useSelector(OrganiserSelectors.organisersMap)
    const event = useSelector(OrganiserSelectors.event)
    const teams = useSelector(OrganiserSelectors.teams)

    const query = new URLSearchParams(location.search)
    const hasModal = query.has('modal')
    const activeModal = query.get('modal')
    const [selected, setSelected] = useState([])

    const openSingleEdit = useCallback(
        row => {
            const search = `?${new URLSearchParams({
                modal: 'edit',
                id: row.original.user,
            }).toString()}`
            dispatch(push({ search }))
        },
        [dispatch],
    )

    const openBulkEmail = useCallback(
        selectedRows => {
            setSelected(selectedRows)
            const search = `?${new URLSearchParams({
                modal: 'bulkEmail',
            })}`
            dispatch(push({ search }))
        },
        [dispatch],
    )

    const openBulkEdit = useCallback(
        selectedRows => {
            setSelected(selectedRows)
            const search = `?${new URLSearchParams({
                modal: 'bulkEdit',
            })}`
            dispatch(push({ search }))
        },
        [dispatch],
    )

    const exportregistrations = selectedRows => {
        setSelected(selectedRows)
    }

    const resetSearch = useCallback(() => {
        dispatch(push({ search: '' }))
    }, [dispatch])

    useEffect(() => {
        //Verify the query parameters
        switch (activeModal) {
            case 'bulkEmail':
            case 'bulkEdit':
                if (selected.length === 0) {
                    resetSearch()
                }
                break
            case 'edit':
                if (!query.has('id')) {
                    resetSearch()
                }
                break
            default:
                break
        }
    }, [activeModal, resetSearch, hasModal, query, selected.length])

    // Add the user's team if it exists
    const attendeesWithTeam = useMemo(() => {
        return attendees.map(attendee => {
            const userId = attendee.user
            const team = teams.find(
                team => team.owner === userId || team.members.includes(userId),
            )
            return {
                ...attendee,
                teamCode: team?.code || 'None',
            }
        })
    }, [attendees, teams])
    const columns = useMemo(() => {
        return [
            {
                Header: '#',
                accessor: (row, index) => {
                    return index + 1
                },
                ...Sorters.Numeric,
                id: 'index',
            },
            {
                Header: 'First name',
                accessor: 'answers.firstName',
                ...Sorters.Alphabetic,
                ...Filters.ContainsSearch,
            },
            {
                Header: 'Last name',
                accessor: 'answers.lastName',
                ...Sorters.Alphabetic,
                ...Filters.ContainsSearch,
            },
            {
                Header: 'Email',
                accessor: 'answers.email',
                ...Sorters.Alphabetic,
                ...Filters.ContainsSearch,
            },
            {
                Header: 'Status',
                accessor: 'status',
                ...Filters.MultipleSelect,
                ...Sorters.Alphabetic,
                Cell: ({ cell: { value } }) => <StatusBadge status={value} />,
            },
            {
                Header: 'Login type',
                accessor: 'user',
                ...Filters.MultipleSelect,
                ...Sorters.Alphabetic,
                Cell: ({ cell: { value } }) => value.split('|')[0],
            },
            {
                Header: 'Rating',
                accessor: 'rating',
                ...Filters.MultipleSelect,
                ...Sorters.Numeric,
                Cell: ({ cell: { value } }) =>
                    value ? (
                        <Rating size="small" value={value} readOnly />
                    ) : (
                        'Not rated'
                    ),
            },
            {
                Header: 'Tags',
                accessor: 'tags',
                ...Sorters.ArrayLength,
                Cell: ({ cell: { value } }) => {
                    if (!value || !value.length) {
                        return 'No tags'
                    } else {
                        return event.tags
                            .filter(tag => {
                                return value.indexOf(tag.label) !== -1
                            })
                            .map(({ color, label }) => (
                                <Box key={label} ml="3px" mt="3px">
                                    <Tag color={color} label={label} />
                                </Box>
                            ))
                    }
                },
            },
            {
                Header: 'Team code',
                accessor: 'teamCode',
                ...Sorters.Alphabetic,
                ...Filters.ContainsSearch,
            },
            {
                Header: 'Created at',
                accessor: 'createdAt',
                ...Sorters.DateTime,
                Cell: ({ cell: { value } }) =>
                    moment(value).format('MMM Do YYYY HH:mm:ss'),
            },
            {
                Header: 'Assigned to',
                accessor: 'assignedTo',
                ...Sorters.Alphabetic,
                Cell: ({ cell: { value } }) => {
                    let text
                    if (!value) {
                        text = 'No one'
                    } else if (organiserProfilesMap.hasOwnProperty(value)) {
                        const user = organiserProfilesMap[value]
                        text = `${user.firstName} ${user.lastName}`
                    } else {
                        text = '???'
                    }
                    return text
                },
            },
        ]
    }, [event.tags, organiserProfilesMap])

    return (
        <>
            <EditRegistrationModal
                registrationId={
                    activeModal === 'edit' ? searchParams.get('id') : undefined
                }
                onClose={resetSearch}
            />
            <BulkEditRegistrationModal
                visible={activeModal === 'bulkEdit'}
                onClose={resetSearch}
                userIds={selected.map(s => s.original.user)}
            />
            <BulkEmailModal
                visible={activeModal === 'bulkEmail'}
                onClose={resetSearch}
                userIds={selected.map(s => s.original.user)}
            />
            <Table
                data={attendeesWithTeam}
                columns={columns}
                onRowClick={openSingleEdit}
                bulkActions={[
                    {
                        key: 'bulk-email',
                        label: 'Email all',
                        action: openBulkEmail,
                    },
                    {
                        key: 'bulk-edit',
                        label: 'Edit all',
                        action: openBulkEdit,
                    },
                    {
                        key: 'export-registrations',
                        label: (
                            <CSVLink
                                style={{
                                    textDecoration: 'none',
                                    color: 'inherit',
                                }}
                                data={selected.map(item => {
                                    const returnObject = {
                                        ...flattenObject(
                                            item.original,
                                            skipArray,
                                            stringEscapeArray,
                                        ),
                                        registrationId: item.original._id,
                                    }
                                    return returnObject
                                })}
                                filename="registrations-export.csv"
                            >
                                Export registrations
                            </CSVLink>
                        ),
                        action: exportregistrations,
                    },
                    {
                        key: 'export-gavel',
                        label: (
                            <CSVLink
                                style={{
                                    textDecoration: 'none',
                                    color: 'inherit',
                                }}
                                data={_.compact(
                                    selected.map(item => {
                                        if (
                                            item.original.status === 'checkedIn'
                                        ) {
                                            const firstName =
                                                item.original.answers.firstName
                                            const email =
                                                item.original.answers.email
                                            const registrationId =
                                                item.original._id
                                            const returnObject = {
                                                firstName,
                                                email,
                                                registrationId,
                                            }
                                            return returnObject
                                        }
                                    }),
                                )}
                                filename="registrations-gavel.csv"
                            >
                                Export for gavel
                            </CSVLink>
                        ),
                        action: exportregistrations,
                    },
                ]}
            />
        </>
    )
}

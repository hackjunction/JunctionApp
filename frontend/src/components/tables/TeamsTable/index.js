import React, { useMemo, useState, useCallback } from 'react'

import { push } from 'connected-react-router'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { sumBy } from 'lodash-es'
import { Typography, Grid, Box, Slider, Paper } from '@material-ui/core'
import * as OrganiserSelectors from 'redux/organiser/selectors'
import Select from 'components/inputs/SelectOld'
import BulkEditRegistrationModal from 'components/modals/BulkEditRegistrationModal'
import BulkEmailModal from 'components/modals/BulkEmailModal'
import EditTeamModal from 'components/modals/EditTeamModal'

import { Table, Sorters } from 'components/generic/_Table'
import AttendeeTable from '../AttendeeTable'
import * as AuthSelectors from 'redux/auth/selectors'
import CsvExporterService from 'services/csvExporter'
import TeamsService from 'services/teams'

export default ({ loading, teams = [], simplifiedView = false }) => {
    const dispatch = useDispatch()
    const location = useLocation()
    const idToken = useSelector(AuthSelectors.getIdToken)

    const registrationsMap = useSelector(OrganiserSelectors.registrationsMap)
    const event = useSelector(OrganiserSelectors.event)

    const [reviewStatus, setReviewStatus] = useState('any')
    const [completedStatus, setCompletedStatus] = useState('any')
    const [ratingRange, setRatingRange] = useState([0, 5])
    const [bulkEdit, setBulkEdit] = useState(false)
    const [bulkEmail, setBulkEmail] = useState(false)

    const searchParams = new URLSearchParams(location.search)
    const query = new URLSearchParams(location.search)
    const activeModal = query.get('modal')

    const openSingleTeamEdit = row => {
        const search = `?${new URLSearchParams({
            modal: 'editTeam',
            code: row.original.code,
        }).toString()}`
        dispatch(push({ search }))
    }

    const resetSearch = useCallback(() => {
        dispatch(push({ search: '' }))
    }, [dispatch])

    const handleRatingRangeChange = useCallback((e, value) => {
        setRatingRange(value)
    }, [])

    const teamsPopulated = useMemo(() => {
        return teams.map(team => {
            const membersMapped = team.members
                .map(member => {
                    return registrationsMap[member]
                })
                .filter(member => typeof member !== 'undefined')
            const teamName = team.name
            const ownerMapped = registrationsMap[team.owner] || {}
            const allMembers = membersMapped.concat(ownerMapped)
            const reviewedCount = allMembers.filter(
                member => member && member.rating,
            ).length
            const memberCount = allMembers.length
            return {
                ...team,
                name: teamName,
                owner: ownerMapped,
                members: allMembers,
                avgRating: (
                    sumBy(allMembers, m => m.rating || 0) / allMembers.length
                ).toFixed(2),
                reviewedPercent: Math.floor(
                    (reviewedCount * 100) / memberCount,
                ),
            }
        })
    }, [teams, registrationsMap])

    const teamsFiltered = teamsPopulated.filter(team => {
        if (completedStatus === 'completed' && !team.complete) {
            return false
        }
        if (completedStatus === 'not-completed' && team.complete) {
            return false
        }
        if (reviewStatus === 'fully-reviewed' && team.reviewedPercent !== 100) {
            return false
        }

        if (reviewStatus === 'not-reviewed' && team.reviewedPercent === 100) {
            return false
        }

        if (ratingRange[0] > team.avgRating) {
            return false
        }

        if (ratingRange[1] < team.avgRating) {
            return false
        }
        return true
    })

    const filteredMemberIds = useMemo(() => {
        return teamsFiltered.reduce((res, team) => {
            return res.concat(team.members.map(reg => reg.user))
        }, [])
    }, [teamsFiltered])

    const columns = useMemo(() => {
        return [
            {
                Header: '#',
                accessor: (row, index) => {
                    return index + 1
                },
                id: 'index',
                sortType: Sorters.Numeric,
            },
            {
                Header: 'Owner',
                accessor: row => {
                    const { owner } = row
                    if (!owner || !owner.answers) return '???'
                    return `${owner.answers.firstName} ${owner.answers.lastName}`
                },
                id: 'owner',
                ...Sorters.Alphabetic,
            },
            {
                Header: 'Code',
                accessor: 'code',
                ...Sorters.Alphabetic,
            },
            {
                Header: 'Name',
                accessor: 'name',
                ...Sorters.Alphabetic,
            },
            {
                Header: 'Members',
                accessor: row => row.members.length,
                id: 'members',
                ...Sorters.Numeric,
            },
            {
                Header: 'Avg. Rating',
                accessor: 'avgRating',
                ...Sorters.Numeric,
            },
            {
                Header: '% Reviewed',
                accessor: 'reviewedPercent',
                ...Sorters.Numeric,
                Cell: ({ cell: { value } }) => {
                    return (
                        <Typography
                            variant="button"
                            color={value === 100 ? 'primary' : 'secondary'}
                        >
                            {value}%
                        </Typography>
                    )
                },
            },
        ]
    }, [])

    const fetchExportTeamData = teamIds => {
        TeamsService.exportTeams(idToken, event.slug, teamIds).then(
            response => {
                CsvExporterService.exportToCsv(response, 'teams-export')
            },
        )
    }

    return (
        <Grid container spacing={2}>
            <EditTeamModal
                teamCode={
                    activeModal === 'editTeam'
                        ? searchParams.get('code')
                        : undefined
                }
                onClose={resetSearch}
            />
            <BulkEditRegistrationModal
                visible={bulkEdit}
                onClose={setBulkEdit}
                registrationIds={filteredMemberIds}
            />
            <BulkEmailModal
                visible={bulkEmail}
                onClose={setBulkEmail}
                registrationIds={filteredMemberIds}
            />
            {!simplifiedView && (
                <>
                    <Grid item xs={12} md={6}>
                        <Paper p={2}>
                            <Box p={2}>
                                <Select
                                    value={completedStatus}
                                    onChange={setCompletedStatus}
                                    label="Completed status"
                                    options={[
                                        {
                                            value: 'any',
                                            label: 'Any',
                                        },
                                        {
                                            value: 'completed',
                                            label: 'Completed',
                                        },
                                        {
                                            value: 'not-completed',
                                            label: 'Not completed',
                                        },
                                    ]}
                                />
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Paper>
                            <Box p={2}>
                                <Select
                                    value={reviewStatus}
                                    onChange={setReviewStatus}
                                    label="Review status"
                                    options={[
                                        {
                                            value: 'any',
                                            label: 'Any',
                                        },
                                        {
                                            value: 'fully-reviewed',
                                            label: 'Fully reviewed',
                                        },
                                        {
                                            value: 'not-reviewed',
                                            label: 'Not fully reviewed',
                                        },
                                    ]}
                                />
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper>
                            <Box
                                padding={2}
                                display="flex"
                                flexDirection="column"
                            >
                                <Typography
                                    variant="subtitle1"
                                    paragraph
                                    align="center"
                                >
                                    Rating between
                                </Typography>
                                <Box paddingLeft={2} paddingRight={2}>
                                    <Slider
                                        defaultValue={ratingRange}
                                        onChangeCommitted={
                                            handleRatingRangeChange
                                        }
                                        valueLabelDisplay="on"
                                        aria-labelledby="range-slider"
                                        min={0}
                                        max={5}
                                        step={0.1}
                                    />
                                </Box>
                            </Box>
                        </Paper>
                    </Grid>
                </>
            )}

            <Grid item xs={12}>
                <Table
                    data={teamsFiltered}
                    columns={columns}
                    renderExpanded={row => (
                        <AttendeeTable attendees={row.original.members} />
                    )}
                    //onRowClick={openSingleTeamEdit}
                    bulkActions={[
                        {
                            key: 'export-teams',
                            label: 'Export team members',
                            action: rows => {
                                const teamIds = rows.map(
                                    row => row.original._id,
                                )
                                fetchExportTeamData(teamIds)
                            },
                        },
                        {
                            key: 'edit-team',
                            label: 'Edit team',
                            action: rows => {
                                openSingleTeamEdit(rows[0])
                            },
                        },
                    ]}
                />
                {/* <MaterialTable
                    title="Teams"
                    showCount
                    isLoading={loading}
                    data={teamsFiltered}
                    onSearchChange={handleSearchChange}
                    actions={[
                        {
                            icon: forwardRef((props, ref) => (
                                <EmailIcon {...props} ref={ref} />
                            )),
                            tooltip: 'Email all',
                            isFreeAction: true,
                            onClick: () => setBulkEmail(true),
                            hidden: searchActive,
                        },
                        {
                            icon: forwardRef((props, ref) => (
                                <EditIcon {...props} ref={ref} />
                            )),
                            tooltip: 'Edit all',
                            isFreeAction: true,
                            onClick: () => setBulkEdit(true),
                            hidden: searchActive,
                        },
                    ]}
                    localization={{
                        toolbar: {
                            searchPlaceholder: 'Search by code / owner',
                        },
                    }}
                    options={{
                        debounceInterval: 500,
                        pageSizeOptions: [5, 25, 50],
                    }}
                    detailPanel={rowData => {
                        return (
                            <Box
                                className={classes.detailPanel}
                                overlow="auto"
                                width="100%"
                                p={2}
                            >
                                <AttendeeTable
                                    title="Members"
                                    minimal={true}
                                    attendees={rowData.members}
                                />
                            </Box>
                        )
                    }}
                /> */}
            </Grid>
        </Grid>
    )
}

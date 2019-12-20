import React, { useMemo, useState, useCallback, forwardRef } from 'react'

import { useSelector } from 'react-redux'
import { sumBy } from 'lodash-es'
import { makeStyles } from '@material-ui/core/styles'
import { Typography, Grid, Box, Slider, Paper } from '@material-ui/core'
import EmailIcon from '@material-ui/icons/Email'
import EditIcon from '@material-ui/icons/Edit'

import * as OrganiserSelectors from 'redux/organiser/selectors'
import MaterialTable from 'components/generic/MaterialTable'
import AttendeeTable from 'components/tables/AttendeeTable'
import Select from 'components/inputs/SelectOld'
import BulkEditRegistrationModal from 'components/modals/BulkEditRegistrationModal'
import BulkEmailModal from 'components/modals/BulkEmailModal'

const useStyles = makeStyles(theme => ({
    detailPanel: {
        padding: theme.spacing(2),
        backgroundColor: '#fafafa',
    },
}))

export default ({ loading, teams = [] }) => {
    const registrationsMap = useSelector(OrganiserSelectors.registrationsMap)
    const classes = useStyles()
    const [reviewStatus, setReviewStatus] = useState('any')
    const [completedStatus, setCompletedStatus] = useState('any')
    const [ratingRange, setRatingRange] = useState([0, 5])
    const [bulkEdit, setBulkEdit] = useState(false)
    const [bulkEmail, setBulkEmail] = useState(false)
    const [searchActive, setSearchActive] = useState(false)

    const handleSearchChange = useCallback(val => {
        if (val && val.length > 0) {
            setSearchActive(true)
        } else {
            setSearchActive(false)
        }
    }, [])

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
            const ownerMapped = registrationsMap[team.owner] || {}
            const allMembers = membersMapped.concat(ownerMapped)
            const reviewedCount = allMembers.filter(
                member => member && member.rating
            ).length
            const memberCount = allMembers.length
            return {
                ...team,
                owner: ownerMapped,
                members: allMembers,
                avgRating: (
                    sumBy(allMembers, m => m.rating || 0) / allMembers.length
                ).toFixed(2),
                reviewedPercent: Math.floor(
                    (reviewedCount * 100) / memberCount
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

    return (
        <Grid container spacing={2}>
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
                    <Box padding={2} display="flex" flexDirection="column">
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
                                onChangeCommitted={handleRatingRangeChange}
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
            <Grid item xs={12}>
                <MaterialTable
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
                    columns={[
                        {
                            title: 'Owner',
                            field: 'owner',
                            searchable: true,
                            customFilterAndSearch: (
                                keyword,
                                row,
                                { render }
                            ) => {
                                return render(row).indexOf(keyword) !== -1
                            },
                            render: row => {
                                const { owner } = row
                                if (!owner || !owner.answers) return '???'
                                return `${owner.answers.firstName} ${owner.answers.lastName}`
                            },
                        },
                        {
                            title: 'Code',
                            field: 'code',
                            searchable: true,
                        },
                        {
                            title: 'Members',
                            field: 'members',
                            render: row => row.members.length,
                        },
                        {
                            title: 'Avg. Rating',
                            field: 'avgRating',
                        },
                        {
                            title: '% Reviewed',
                            field: 'reviewedPercent',
                            render: row => {
                                if (row.reviewedPercent === 100) {
                                    return (
                                        <Typography
                                            variant="button"
                                            color="primary"
                                        >
                                            100%
                                        </Typography>
                                    )
                                } else {
                                    return (
                                        <Typography
                                            variant="button"
                                            color="secondary"
                                        >
                                            {row.reviewedPercent}%
                                        </Typography>
                                    )
                                }
                            },
                        },
                        {
                            title: 'Completed',
                            field: 'complete',
                            render: row => {
                                if (row.complete) {
                                    return (
                                        <Typography
                                            variant="button"
                                            color="primary"
                                        >
                                            Yes
                                        </Typography>
                                    )
                                } else {
                                    return (
                                        <Typography
                                            variant="button"
                                            color="secondary"
                                        >
                                            No
                                        </Typography>
                                    )
                                }
                            },
                        },
                    ]}
                />
            </Grid>
        </Grid>
    )
}

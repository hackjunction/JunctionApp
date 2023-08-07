import React, { useEffect, useState } from 'react'

import PageWrapper from 'components/layouts/PageWrapper'
import GlobalNavBar from 'components/navbars/GlobalNavBar'
import Footer from 'components/layouts/Footer'

import junctionStyle from 'utils/styles'
import {
    AppBar,
    Card,
    CardActions,
    CardContent,
    Chip,
    Dialog,
    Grid,
    Tab,
    Tabs,
    Typography,
} from '@material-ui/core'
import { Yes, No, NotAvailable } from 'components/generic/Tag/Variants'

import Accordion from '@material-ui/core/Accordion'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionActions from '@material-ui/core/AccordionActions'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Divider from '@material-ui/core/Divider'

import { Formik } from 'formik'
import * as OrganiserSelectors from 'redux/organiser/selectors'
import * as OrganiserActions from 'redux/organiser/actions'

import * as DashboardSelectors from 'redux/dashboard/selectors'
import * as DashboardActions from 'redux/dashboard/actions'

import * as SnackbarActions from 'redux/snackbar/actions'
import { useRouteMatch, useLocation } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { useMutation } from '@apollo/client'
import { UPDATE_EVENT } from 'graphql/mutations/eventOps'
import { forOwn } from 'lodash-es'
import yupSchema from '@hackjunction/shared/schemas/validation/eventSchema'

import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'

import Container from 'components/generic/Container'
import Button from 'components/generic/Button'
import Tag from 'components/generic/Tag'
import { Skeleton, TabPanel } from '@material-ui/lab'
import TeamCard from 'components/cards/TeamCard'
import MaterialTabsLayout from 'components/layouts/MaterialTabsLayout'
import BottomBar from 'components/inputs/BottomBar'
import TeamProfile from 'components/Team/TeamProfile'
import Apply from 'components/Team/Apply'
import Filter from 'components/Team/Filter'
import JoinTeamByCode from 'components/Team/JoinTeamByCode'

export default () => {
    const dispatch = useDispatch()
    const event = useSelector(DashboardSelectors.event)
    const { slug, _id } = event
    //TODO update teams after application is submitted
    useEffect(() => {
        dispatch(DashboardActions.updateTeams(slug))
    }, [])
    const teams = useSelector(DashboardSelectors.teams)
    const selectedTeam = useSelector(DashboardSelectors.selectedTeam)
    const hasTeam = useSelector(DashboardSelectors.hasTeam)
    // TODO add a method to disable the apply button if the user is already in a team
    //TODO add a conditional rendering to show a 'no teams' message if there are no teams to render
    const [selected, setSelected] = useState(false)
    const [applying, setApplying] = useState(false)
    const [joinByCode, setJoinByCode] = useState(false)
    const [challengeFilter, setChallengeFilter] = useState('All challenges')

    const onFilterChange = filter => {
        console.log('filter from page', filter)
        setChallengeFilter(filter)
    }

    let teamCards = []
    if (challengeFilter !== 'All challenges') {
        teamCards = teams.filter(team => team.challenge === challengeFilter)
    } else {
        teamCards = teams
    }

    //TODO move any async calls from the Apply from into this page
    //TODO add a method to edit or withdraw an application
    return (
        <>
            {applying && selectedTeam && Object.keys(selectedTeam).length > 0 && (
                <div>
                    <div className="tw-mb-4">
                        <Button
                            color="outlined_button"
                            variant="jOutlined"
                            onClick={() => setApplying(false)}
                        >
                            Back
                        </Button>
                    </div>
                    <Apply
                        teamRolesData={selectedTeam.teamRoles}
                        afterSubmitAction={() => setApplying(false)}
                    />
                </div>
            )}
            {selected && selectedTeam && Object.keys(selectedTeam).length > 0 && (
                <div>
                    <div className="tw-mb-4">
                        <Button
                            color="outlined_button"
                            variant="jOutlined"
                            onClick={() => setSelected(false)}
                        >
                            Back
                        </Button>
                    </div>
                    <TeamProfile
                        teamData={selectedTeam}
                        enableActions={false}
                        onRoleClick={() => {
                            if (!hasTeam) {
                                setApplying(true)
                                setSelected(false)
                            }
                        }}
                    />
                </div>
            )}
            {!selected && !applying && (
                <>
                    <div className="tw-flex tw-justify-between tw-items-center tw-mb-4">
                        <Button
                            color="outlined_button"
                            variant="jOutlined"
                            onClick={() => setJoinByCode(!joinByCode)}
                        >
                            Join team using a code
                        </Button>
                        <Filter
                            noFilterOption="All challenges"
                            filterArray={event.challenges.map(
                                challenge => challenge.name,
                            )}
                            onChange={onFilterChange}
                        />
                    </div>
                    {joinByCode && (
                        <div className="tw-bg-white tw-p-4 tw-text-left tw-rounded-lg tw-shadow-md tw-flex tw-justify-center tw-items-center tw-gap-4">
                            <JoinTeamByCode />
                            <div>
                                <Button
                                    color="outlined_button"
                                    variant="jOutlined"
                                    onClick={() => setJoinByCode(false)}
                                >
                                    Close
                                </Button>
                            </div>
                        </div>
                    )}
                    {teamCards.length > 0 ? (
                        <ResponsiveMasonry
                            columnsCountBreakPoints={{
                                600: 1,
                                800: 2,
                                1440: 3,
                            }}
                        >
                            <Masonry>
                                {teamCards?.map(team => (
                                    <TeamCard
                                        key={team._id}
                                        teamData={team}
                                        disableActions={hasTeam}
                                        onClickApply={() => {
                                            setApplying(true)
                                            dispatch(
                                                DashboardActions.updateSelectedTeam(
                                                    slug,
                                                    team.code,
                                                ),
                                            )
                                        }}
                                        onClick={() => {
                                            setSelected(true)
                                            dispatch(
                                                DashboardActions.updateSelectedTeam(
                                                    slug,
                                                    team.code,
                                                ),
                                            )
                                        }}
                                    />
                                ))}
                            </Masonry>
                        </ResponsiveMasonry>
                    ) : (
                        <div>No teams found</div>
                    )}
                </>
            )}
        </>
    )
}

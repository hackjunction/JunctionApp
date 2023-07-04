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

export default () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(DashboardActions.updateTeams(slug))
    }, [])
    const event = useSelector(DashboardSelectors.event)
    const teams = useSelector(DashboardSelectors.teams)
    const team = useSelector(DashboardSelectors.team)
    const { slug, _id } = event
    console.log(teams)

    const [selected, setSelected] = useState(false)
    const [teamSelected, setTeamSelected] = useState({})

    useEffect(() => {
        teamSelected && console.log(teamSelected)
    }, [teamSelected])

    return (
        <>
            <ResponsiveMasonry
                columnsCountBreakPoints={{ 350: 1, 900: 2, 1440: 3 }}
            >
                <Masonry>
                    {teams?.map(team => (
                        <TeamCard
                            key={team._id}
                            teamData={team}
                            onClick={() => {
                                setSelected(true)
                                setTeamSelected(team)
                            }}
                        />
                    ))}
                    <TeamCard />
                    <TeamCard />
                </Masonry>
            </ResponsiveMasonry>
            <Dialog
                transitionDuration={0}
                open={Boolean(selected)}
                onClose={() => {
                    setSelected(false)
                    setTeamSelected({})
                }}
            >
                <div className="tw-p-4">
                    <TeamProfile />
                </div>
            </Dialog>
        </>
    )
}

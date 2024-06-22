import React, { useState, useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Box, Grid, makeStyles } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

import PageHeader from 'components/generic/PageHeader'
import NewEventCard from 'components/events/NewEventCard'
import Button from 'components/generic/Button'

import * as AuthSelectors from 'reducers/auth/selectors'
import * as UserSelectors from 'reducers/user/selectors'
import * as UserActions from 'reducers/user/actions'

import CreateEventCard from './CreateEventCard'
import TextInput from '../../../../../components/inputs/TextInput'
import { debugGroup } from 'utils/debuggingTools'

//TODO: make this to use theme colors and make prettier
const useStyles = makeStyles({
    statusText: {
        fontSize: '28px',
        transform: 'rotate(-10deg)',
        top: '10%',
        left: '5%',
        position: 'relative',
        zIndex: '10',
    },
    green: {
        color: '#4CB9A3',
        fontWeight: 'bold',
        background: '#bef67a',
        borderRadius: '5px',
        padding: '0 0 0 5px',
        opacity: '70%',
    },
    yellow: {
        color: '#EAB059',
        fontWeight: 'bold',
        background: 'lightyellow',
        borderRadius: '5px',
        padding: '0 0 0 5px',
        opacity: '70%',
    },
    orange: {
        color: '#EF6D6D',
        fontWeight: 'bold',
        background: 'lightgoldenrodyellow',
        borderRadius: '5px',
        padding: '0 0 0 5px',
        opacity: '70%',
    },
})

export default () => {
    const userId = useSelector(AuthSelectors.getUserId)
    const idToken = useSelector(AuthSelectors.getIdToken)
    const organizerEvents = useSelector(UserSelectors.organizerEvents)
    const classes = useStyles()

    const dispatch = useDispatch()
    const { t } = useTranslation()
    var date = new Date()
    const isodate = date.toISOString()

    const [searchTerm, setSearchTerm] = useState('')
    const [searchResults, setSearchResults] = useState(organizerEvents)
    const [name, setName] = useState('')
    const [error, setError] = useState()
    const [loading, setLoading] = useState(false)
    const hasError = Boolean(error)

    const isOrganizer = useSelector(AuthSelectors.idTokenData)?.roles?.some(r =>
        ['Organiser', 'AssistantOrganiser', 'SuperAdmin'].includes(r),
    )

    //TODO implement pagination to improve performance of organize tab

    useEffect(() => {
        const results = organizerEvents.filter(
            event =>
                event.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !==
                -1,
        )
        setSearchResults(results)
    }, [organizerEvents, searchTerm])

    //TODO: super slow on superadmin. fix the rendering
    return organizerEvents.length === 0 || !isOrganizer ? (
        <>
            <PageHeader
                heading="Your Admin Events"
                subheading="You don't have any events yet. Wanna create one?"
            />
            <Box mt={3}>
                <Grid container spacing={3}>
                    <CreateEventCard></CreateEventCard>
                </Grid>
            </Box>
        </>
    ) : (
        <>
            <PageHeader
                heading="Your admin events"
                subheading="You are organizing these events"
            />
            <Box mt={3}>
                <Grid
                    container
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center"
                    spacing={3}
                >
                    <Grid item>
                        <SearchIcon />
                    </Grid>
                    <Grid item xs>
                        <TextInput
                            value={searchTerm}
                            onChange={setSearchTerm}
                            placeholder={t('Search_')}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    <CreateEventCard />
                    {searchResults.map((event, index) => (
                        <Grid key={index} item xs={12} md={6} lg={4}>
                            <div className={classes.statusText}>
                                {event.published && event.approved ? (
                                    <span className={classes.green}>
                                        Published!
                                    </span>
                                ) : null}
                                {event.published && !event.approved ? (
                                    <span className={classes.yellow}>
                                        Waiting approval
                                    </span>
                                ) : null}
                                {!event.published ? (
                                    <span className={classes.orange}>
                                        Not published
                                    </span>
                                ) : null}
                            </div>

                            <NewEventCard
                                event={event}
                                buttons={[
                                    <Button
                                        size="small"
                                        onClick={() =>
                                            dispatch(
                                                push('/events/' + event.slug),
                                            )
                                        }
                                    >
                                        {t('See_more_')}
                                    </Button>,
                                    <Button
                                        size="small"
                                        onClick={() => {
                                            dispatch(
                                                UserActions.setAccessRight(
                                                    'organizer',
                                                ),
                                            )
                                            dispatch(
                                                push(`/organise/${event.slug}`),
                                            )
                                        }}
                                    >
                                        {t('Manage_')}
                                    </Button>,
                                ]}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </>
    )
}

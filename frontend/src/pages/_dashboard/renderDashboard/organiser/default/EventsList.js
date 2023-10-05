import React from 'react'

import { push } from 'connected-react-router'
import { useDispatch } from 'react-redux'
import { Grid, Box, Typography, makeStyles } from '@material-ui/core'
import EventCard from 'components/events/EventCard'
import Button from 'components/generic/Button'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { useEffect } from 'react'

import SearchIcon from '@material-ui/icons/Search'
import TextInput from '../../../../../components/inputs/TextInput'

/*
textShadow:
    '-1px -1px 0 green, 1px -1px 0 green, -1px 1px 0 green, 1px 1px 0 green',
*/
const useStyles = makeStyles({
    statusText: {
        fontSize: '28px',
        transform: 'rotate(-10deg)',
        top: '20%',
        position: 'relative',
        zIndex: '10',
    },
    green: {
        color: 'green',
        fontWeight: 'bold',
        background: 'lightgreen',
        padding: '0 0 0 5px',
        opacity: '70%',
    },
    yellow: {
        color: 'yellow',
        fontWeight: 'bold',
        background: 'lightyellow',
        padding: '0 0 0 5px',
        opacity: '70%',
    },
    orange: {
        color: 'orange',
        fontWeight: 'bold',
        background: 'lightgoldenrodyellow',
        padding: '0 0 0 5px',
        opacity: '70%',
    },
})

export default ({ events = [] }) => {
    const [searchTerm, setSearchTerm] = React.useState('')
    const [searchResults, setSearchResults] = useState(events)

    // const handleChange = event => {
    //     setSearchTerm(event.target.value)
    // }

    useEffect(() => {
        const results = events.filter(
            event =>
                event.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !==
                -1,
        )
        setSearchResults(results)
    }, [events, searchTerm])

    const dispatch = useDispatch()
    const { t } = useTranslation()
    const classes = useStyles()
    return (
        <Box mt={3}>
            <Typography variant="h6" gutterBottom>
                {t('Your_events_')}
            </Typography>
            <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="center"
                spacing={1}
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
                {searchResults.map(event => (
                    <Grid item xs={12} md={6} lg={4}>
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
                        <EventCard
                            event={event}
                            buttons={[
                                <Button
                                    color="primary"
                                    variant="contained"
                                    onClick={() =>
                                        dispatch(
                                            push(`/organise/${event.slug}`),
                                        )
                                    }
                                >
                                    {t('Manage_')}
                                </Button>,
                            ]}
                        />
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}

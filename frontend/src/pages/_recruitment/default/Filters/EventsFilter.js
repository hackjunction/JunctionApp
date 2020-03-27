import React, { useCallback, useMemo } from 'react'

import { Box, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useDispatch, useSelector } from 'react-redux'
import * as AuthSelectors from 'redux/auth/selectors'
import * as RecruitmentSelectors from 'redux/recruitment/selectors'
import * as RecruitmentActions from 'redux/recruitment/actions'

import { useArray } from 'hooks/customHooks'
import Select from 'components/inputs/Select'

import FilterItem from './FilterItem'
import EventsFilterItem from './EventsFilterItem'
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(theme => ({
    wrapper: {
        width: '400px',
        minHeight: '400px',
    },
    items: {
        backgroundColor: '#fafafa',
        borderRadius: '7px',
        padding: theme.spacing(1),
    },
    itemsEmpty: {
        padding: theme.spacing(2),
        textAlign: 'center',
    },
}))

export default () => {
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch()
    const idTokenData = useSelector(AuthSelectors.idTokenData)
    const allEvents = useSelector(RecruitmentSelectors.events)
    const eventsMap = useSelector(RecruitmentSelectors.eventsMap)
    const filters = useSelector(RecruitmentSelectors.filters)?.events ?? []
    const classes = useStyles()
    const [events, addEvent, removeEvent, editEvent, setEvents] = useArray(
        filters
    )

    const handleSubmit = useCallback(() => {
        dispatch(RecruitmentActions.setFiltersField('events', events))
    }, [dispatch, events])

    const handleReset = useCallback(() => {
        setEvents(filters)
    }, [filters, setEvents])

    const handleAdd = useCallback(
        event => {
            addEvent({
                event,
                statuses: [],
            })
        },
        [addEvent]
    )

    const eventOptions = useMemo(() => {
        return allEvents
            .filter(event => {
                return (
                    idTokenData.recruiter_events &&
                    idTokenData.recruiter_events.indexOf(event._id) !== -1
                )
            })
            .map(event => ({
                label: event.name,
                value: event._id,
            }))
    }, [idTokenData, allEvents])

    const renderEvents = () => {
        if (!events.length) {
            return (
                <Typography variant="subtitle1" className={classes.itemsEmpty}>
                    {t('No_events_selected_')}
                </Typography>
            )
        }

        return events.map((item, index) => (
            <EventsFilterItem
                {...item}
                eventName={eventsMap[item.event].name}
                key={item.event}
                onEdit={item => editEvent(index, item)}
                onRemove={() => removeEvent(index)}
            />
        ))
    }

    return (
        <FilterItem
            active={filters.length > 0}
            label="Events"
            onSubmit={handleSubmit}
            onClose={handleReset}
        >
            <Box className={classes.wrapper}>
                <Select
                    autoFocus
                    label={t('Choose_events_')}
                    options={eventOptions}
                    onChange={handleAdd}
                />
                <Box className={classes.items}>{renderEvents()}</Box>
            </Box>
        </FilterItem>
    )
}

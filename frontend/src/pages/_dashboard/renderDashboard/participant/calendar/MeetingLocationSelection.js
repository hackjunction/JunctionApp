import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import Button from 'components/generic/Button'
import Switch from 'components/generic/Switch'

import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    makeStyles,
} from '@mui/material'
import { getMeetingRooms } from 'graphql/queries/meetings'
import * as DashboardSelectors from 'reducers/dashboard/selectors'

const useStyles = makeStyles(theme => ({
    background: {
        position: 'absolute',
        backgroundColor: '#00000080',
        width: '100%',
        minHeight: '100vh',
        zIndex: 100,
        top: '0',
        left: '0',
    },
    popupWindow: {
        position: 'relative',
        width: '70%',
        margin: '0 auto',
        height: 'fit-content',
        maxHeight: '120vh',
        marginTop: 'calc(100vh - 85vh - 20px)',
        backgroundColor: '#fff',
        borderRadius: '4px',
        padding: '20px',
        border: '1px solid #999',
        overflow: 'auto',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    closeIcon: {
        width: '25px',
        height: '25px',
        fontSize: 'xx-large',
        color: 'black',
    },
    selected: {
        background: theme.palette.primary.main,
    },
    notSelected: {
        border: theme.palette.grey[300],
        background: theme.palette.grey[300],
    },
    roomSelectLabel: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    capacityWarning: {
        padding: '1em',
        fontWeight: 'bold',
        backgroundColor: theme.palette.error.light,
        color: 'white',
        borderRadius: '0.5em',
        margin: 0,
    },
    physicalConfirmationText: {
        textAlign: 'center',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        margin: '2em',
    },
    warnColor: {
        color: theme.palette.error.main,
    },
}))

export default ({
    bookFunction,
    meetingInfo,
    attendeesCount,
    eventId,
    user,
    close,
}) => {
    const [onlineSelected, setOnlineSelected] = useState(true)
    const [teamSelected, setTeamSelected] = useState(false)
    const [roomSelected, setRoomSelected] = useState('')
    const [partiComSelected, setPartiComSelected] = useState('')
    const start = new Date(meetingInfo.startTime)
    const end = new Date(meetingInfo.endTime)
    const startMinutes = start.getMinutes()
    const endMinutes = end.getMinutes()
    const [meetingRooms, loading, error] = getMeetingRooms({
        eventId: eventId,
    })
    const [roomsLoaded, setRoomsLoaded] = useState(false)
    const [availableRooms, setAvailableRooms] = useState([])

    useEffect(() => {
        if (meetingRooms && !roomsLoaded) {
            const filteredRooms = []
            meetingRooms.forEach(room => {
                // don't filter based on capacity, attendees will be warned if they choose a small room
                // const isLargeEnough = room.capacity >= attendeesCount
                const hasAvailableSlot = room.timeSlots.some(slot => {
                    return slot.start === start.toISOString() && !slot.reserved
                })
                if (hasAvailableSlot) {
                    filteredRooms.push(room.name)
                }
            })
            setAvailableRooms(filteredRooms)
            setRoomsLoaded(true)
        }
    }, [meetingRooms, roomsLoaded, start])

    var att = []
    const team = useSelector(DashboardSelectors.team)
    if (team) {
        att = [...team.members, team.owner]
    } else {
        att = [user?.userId]
    } //TODO: add selection to book alone or for the team

    const handleLocationChange = selection => {
        setOnlineSelected(selection)
    }

    const handleRoomChange = event => {
        setRoomSelected(event.target.value)
    }

    const handlePartiComChange = event => {
        setPartiComSelected(event.target.value)
    }

    const confirmButtonEnabled = () =>
        (onlineSelected || roomSelected !== '') && (team || !teamSelected)

    const confirmButtonAction = () => {
        var attendees = []
        if (teamSelected) {
            attendees = [...team.members, team.owner]
        } else {
            attendees = [user?.userId]
        }
        if (onlineSelected) {
            bookFunction(meetingInfo, attendees, 'ONLINE', partiComSelected)
        } else {
            bookFunction(meetingInfo, attendees, roomSelected, partiComSelected)
        }
    }

    const displayCapacityWarning = () => {
        if (roomSelected === '' || !teamSelected) return false
        const selectedRoom = meetingRooms.find(r => r.name === roomSelected)
        return selectedRoom?.capacity < att.length + 1
    }

    const classes = useStyles()
    return (
        <div className={classes.background}>
            <div className={classes.popupWindow}>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button onClick={close} className={classes.closeIcon}>
                        X
                    </Button>
                </div>
                <h2 style={{ textAlign: 'center' }}>
                    <div>Selected meeting:</div>
                    <span>
                        {start.getDate()}.{start.getMonth() + 1}.
                    </span>
                    &nbsp;
                    <span>
                        {`${start.getHours()}:${
                            startMinutes === 0 ? '00' : startMinutes
                        }`}
                    </span>
                    <span> - </span>
                    <span>{`${end.getHours()}:${
                        endMinutes === 0 ? '00' : endMinutes
                    }`}</span>
                </h2>
                <h3 style={{ textAlign: 'center' }}>
                    Choose whether you want an online meeting or a physical
                    meeting:
                </h3>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            marginBottom: '1rem',
                        }}
                    >
                        <Button
                            variant="contained"
                            className={
                                onlineSelected
                                    ? classes.selected
                                    : classes.notSelected
                            }
                            style={{
                                marginRight: '0.5rem',
                                padding: '0.75rem 2rem',
                            }}
                            onClick={() => handleLocationChange(true)}
                        >
                            Online
                        </Button>

                        <Button
                            variant="contained"
                            className={
                                onlineSelected
                                    ? classes.notSelected
                                    : classes.selected
                            }
                            style={{ padding: '0.75rem 2rem' }}
                            onClick={() => handleLocationChange(false)}
                        >
                            Physical
                        </Button>
                    </div>
                    <h3 style={{ textAlign: 'center' }}>
                        Are you booking for yourself or for your team?
                    </h3>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            marginBottom: '1rem',
                        }}
                    >
                        <Button
                            variant="contained"
                            className={
                                !teamSelected
                                    ? classes.selected
                                    : classes.notSelected
                            }
                            style={{
                                marginRight: '0.5rem',
                                padding: '0.75rem 2rem',
                            }}
                            onClick={() => setTeamSelected(false)}
                        >
                            For myself
                        </Button>

                        <Button
                            variant="contained"
                            className={
                                !teamSelected
                                    ? classes.notSelected
                                    : classes.selected
                            }
                            style={{ padding: '0.75rem 2rem' }}
                            onClick={() => setTeamSelected(true)}
                        >
                            Form my team
                        </Button>
                    </div>
                    {!team && teamSelected && (
                        <p
                            className={classes.warnColor}
                            style={{ fontSize: '1.25em' }}
                        >
                            You don't have a team yet {':('}
                        </p>
                    )}
                    {!onlineSelected &&
                        (roomsLoaded && availableRooms.length > 0 ? (
                            <FormControl style={{ width: '70%' }}>
                                <InputLabel id="challenge-selection-label">
                                    Rooms
                                </InputLabel>
                                {}
                                <Select
                                    labelId="room-selection-label"
                                    id="room-selection"
                                    label="Choose a room"
                                    onChange={handleRoomChange}
                                    value={roomSelected}
                                >
                                    {availableRooms.map((room, index) => {
                                        const roomInfo = meetingRooms.find(
                                            r => r.name === room,
                                        )
                                        return (
                                            <MenuItem
                                                key={index}
                                                value={room}
                                                className={
                                                    classes.roomSelectLabel
                                                }
                                            >
                                                <span>{room}</span>
                                                {roomInfo && (
                                                    <span>
                                                        {' (capacity: '}
                                                        <span
                                                            className={
                                                                teamSelected &&
                                                                roomInfo.capacity <
                                                                    att.length +
                                                                        1
                                                                    ? classes.warnColor
                                                                    : ''
                                                            }
                                                        >
                                                            {roomInfo.capacity}
                                                        </span>
                                                        {')'}
                                                    </span>
                                                )}
                                            </MenuItem>
                                        )
                                    })}
                                </Select>
                            </FormControl>
                        ) : (
                            <p
                                className={classes.warnColor}
                                style={{ fontSize: '1.25em' }}
                            >
                                No rooms available for selected time slot {':('}
                            </p>
                        ))}
                    <FormControl style={{ width: '70%' }}>
                        <InputLabel id="agenda-selection-label">
                            Choose an agenda for this meeting
                        </InputLabel>
                        {}
                        <Select
                            labelId="agenda-selection-label"
                            id="agenda-selection"
                            label="Choose an agenda for this meeting"
                            onChange={handlePartiComChange}
                            value={partiComSelected}
                        >
                            <MenuItem value={'Recruiting'}>
                                <span>{'Recruiting'}</span>
                            </MenuItem>
                            <MenuItem value={'Mentoring'}>
                                <span>{'Mentoring'}</span>
                            </MenuItem>
                            <MenuItem value={'Other'}>
                                <span>{'Other'}</span>
                            </MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginTop: '10%',
                    }}
                >
                    {roomSelected && !onlineSelected && (
                        <div className={classes.physicalConfirmationText}>
                            <p>
                                Confirm the booking to arrange a meeting in{' '}
                                <strong>{roomSelected}</strong>
                            </p>
                            {displayCapacityWarning() && (
                                <p className={classes.capacityWarning}>
                                    Be advised: the chosen room might be small
                                    for your team size
                                </p>
                            )}
                        </div>
                    )}
                    {onlineSelected && (
                        <p>
                            Confirm the booking to receive a Google Meet link
                            for the meeting.
                        </p>
                    )}
                </div>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginTop: 'auto',
                    }}
                >
                    <Button
                        disabled={!confirmButtonEnabled()}
                        variant="contained"
                        onClick={confirmButtonAction}
                    >
                        Confirm
                    </Button>
                </div>
            </div>
        </div>
    )
}

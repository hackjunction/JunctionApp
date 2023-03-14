import React from 'react'

import Button from 'components/generic/Button'
import MuiButton from '@material-ui/core/Button'
import { makeStyles, Tooltip, withStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    meetingCard: ({ booked, isOpenable }) => ({
        width: '100%',
        borderRadius: '0.5em',
        padding: '0.75em',
        marginBottom: '0.5em',
        background: booked ? theme.palette.primary.main : '#d1ebdf',
        fontSize: '16px',
        cursor: 'pointer',
        '&:hover': isOpenable
            ? {
                  filter: 'brightness(0.95)',
              }
            : {},
    }),
    meetingTime: {
        display: 'flex',
        justifyContent: 'space-evenly',
        fontWeight: 'bold',
        fontSize: '1.25em',
        margin: '0.5em 0',
    },
    actionButton: {
        color: 'black',
        fontWeight: 'bold',
        borderRadius: '0.5em',
        width: 'fit-content',
        marginTop: '0.75em',
        fontSize: '0.875em',
        boxShadow: 'none',
    },
    meetingInfo: {
        fontWeight: 'bold',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
    },
    meetsLink: {
        textDecoration: 'none',
    },
    joinButton: {
        borderRadius: '0.5em',
        fontSize: '0.875em',
        color: 'black',
        width: 'fit-content',
        marginTop: '0.75em',
        marginRight: '0.75em',
        background: '#d1ebdf',
        borderColor: '#d1ebdf',
        '&:hover': {
            background: '#39967a',
            borderColor: '#39967a',
        },
    },
    locationText: {
        textAlign: 'center',
        width: '100%',
        margin: '0.5em',
    },
}))

const ButtonBase = withStyles({
    root: {
        '&.Mui-disabled': {
            pointerEvents: 'auto',
        },
    },
})(MuiButton)

const ButtonWithTooltip = ({ tooltipText, disabled, onClick, ...other }) => {
    const adjustedButtonProps = {
        disabled: disabled,
        component: disabled ? 'div' : undefined,
        onClick: disabled ? undefined : onClick,
    }
    return (
        <Tooltip title={tooltipText}>
            <ButtonBase {...other} {...adjustedButtonProps} />
        </Tooltip>
    )
}

export default ({
    startTime,
    endTime,
    booked,
    googleMeetLink,
    cancelAction,
    hasFutureBooking,
    isOpen,
    cardOnClick,
    showLocationSelection,
    location,
}) => {
    const start = new Date(startTime)
    const end = new Date(endTime)
    const startMinutes = start.getMinutes()
    const endMinutes = end.getMinutes()
    // Make the meeting card openable if the meeting is in the future or if it is booked and hasn't ended yet
    const isOpenable =
        start.getTime() > new Date().getTime() ||
        (booked && end.getTime() > new Date().getTime())
    const classes = useStyles({ booked, isOpenable })

    const openContent = () => (
        <>
            {booked ? (
                <div className={classes.meetingInfo}>
                    {googleMeetLink && (
                        <a
                            className={classes.meetsLink}
                            href={googleMeetLink}
                            target="blank"
                        >
                            <Button
                                className={classes.joinButton}
                                variant="contained"
                                color="theme_orange"
                            >
                                JOIN MEETING
                            </Button>
                        </a>
                    )}
                    <Button
                        className={classes.actionButton}
                        variant="contained"
                        color="error"
                        onClick={cancelAction}
                    >
                        CANCEL
                    </Button>
                </div>
            ) : (
                <ButtonWithTooltip
                    className={classes.actionButton}
                    variant="contained"
                    color="primary"
                    onClick={showLocationSelection}
                    disabled={hasFutureBooking}
                    tooltipText="You can only have one upcoming meeting at a time."
                >
                    Book this meeting
                </ButtonWithTooltip>
            )}
        </>
    )

    return (
        <div
            className={classes.meetingCard}
            key={startTime}
            onClick={isOpenable ? cardOnClick : () => {}}
            style={!isOpenable ? { cursor: 'default' } : {}}
        >
            <p className={classes.meetingTime}>
                <span>{`${start.getHours()}:${
                    startMinutes === 0 ? '00' : startMinutes
                }`}</span>
                <span> - </span>
                <span>{`${end.getHours()}:${
                    endMinutes === 0 ? '00' : endMinutes
                }`}</span>
            </p>
            {booked && <p className={classes.locationText}>{location}</p>}
            {(isOpen || booked) && openContent()}
        </div>
    )
}

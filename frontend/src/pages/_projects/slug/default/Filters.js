import React from 'react'
import clsx from 'clsx'
import { Grid, Box, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(theme => ({
    filterItem: {
        backgroundColor: 'black',
        color: 'rgba(255,255,255,0.6)',
        padding: theme.spacing(1),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        userSelect: 'none',
        msUserSelect: 'none',
        WebkitUserSelect: 'none',
        MozUserSelect: 'none',
        transition: 'all 0.2s ease',
        '&:hover': {
            color: theme.palette.primary.main,
        },
    },
    filterItemActive: {
        backgroundColor: theme.palette.primary.main,
        color: 'black',
        opacity: 1,
        '&:hover': {
            opacity: 1,
            color: 'black',
        },
    },
    filterItemText: {
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'inherit',
    },
}))

const Filters = ({ event, active = 'by-track', onChange }) => {
    const classes = useStyles()
    console.log('active :>> ', active)
    return (
        <Grid container justify="center" spacing={1}>
            {event.tracksEnabled && event.tracks && (
                <Grid item xs={12} md={6}>
                    <Box
                        onClick={() => onChange('by-track')}
                        className={clsx(classes.filterItem, {
                            [classes.filterItemActive]: active === 'by-track',
                        })}
                    >
                        <Typography
                            className={classes.filterItemText}
                            variant="button"
                        >
                            By track
                        </Typography>
                    </Box>
                </Grid>
            )}
            {event.challengesEnabled && event.challenges && (
                <Grid item xs={12} md={6}>
                    <Box
                        onClick={() => onChange('by-challenge')}
                        className={clsx(classes.filterItem, {
                            [classes.filterItemActive]:
                                active === 'by-challenge',
                        })}
                    >
                        <Typography
                            className={classes.filterItemText}
                            variant="button"
                        >
                            By challenge
                        </Typography>
                    </Box>
                </Grid>
            )}
            <Grid item xs={12} md={6}>
                <Box
                    onClick={() => onChange('')}
                    className={clsx(classes.filterItem, {
                        [classes.filterItemActive]: active === '',
                    })}
                >
                    <Typography
                        className={classes.filterItemText}
                        variant="button"
                    >
                        All projects
                    </Typography>
                </Box>
            </Grid>

            {/* <Grid item xs={12} md={6}>
                <Box
                    onClick={() => onChange('search')}
                    className={clsx(classes.filterItem, {
                        [classes.filterItemActive]: active === 'search',
                    })}
                >
                    <Typography
                        className={classes.filterItemText}
                        variant="button"
                    >
                        Search projects
                    </Typography>
                </Box>
                {active === 'search' ? (
                    <TextInput label="Search projects" autoFocus="true" />
                ) : null}
            </Grid> */}
        </Grid>
    )
}

export default Filters

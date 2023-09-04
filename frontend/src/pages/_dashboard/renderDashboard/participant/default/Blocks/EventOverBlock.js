import React from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { push } from 'connected-react-router'
import moment from 'moment-timezone'
import { EventHelpers } from '@hackjunction/shared'
import { Typography, Grid } from '@material-ui/core'
import GradientBox from 'components/generic/GradientBox'
import Button from 'components/generic/Button'
import * as DashboardSelectors from 'redux/dashboard/selectors'
import config from 'constants/config'

export default () => {
    const dispatch = useDispatch()
    const event = useSelector(DashboardSelectors.event)
    if (!EventHelpers.isEventOver(event, moment)) return null
    return (
        <Grid item xs={12}>
            <GradientBox p={3} color="theme_purple">
                <Typography variant="h4" gutterBottom>
                    That's a wrap!
                </Typography>
                <Typography variant="body1" paragraph>
                    {event.name} is now over, thanks for taking part! Check out
                    your project submission and all of the other cool stuff
                    people made in the project gallery, and stay tuned for the
                    next {config.PLATFORM_OWNER_NAME} event near you!
                </Typography>
                {event.galleryOpen ? (
                    <Button
                        onClick={() =>
                            dispatch(push(`/projects/${event.slug}`))
                        }
                        color="theme_white"
                        variant="contained"
                    >
                        Project gallery
                    </Button>
                ) : (
                    <Typography variant="body1" paragraph>
                        The project gallery is not yet open.
                    </Typography>
                )}
            </GradientBox>
        </Grid>
    )
}

import React, { useState } from 'react'

import { useSelector } from 'react-redux'
import {
    Grid,
    Paper,
    List,
    ListItem,
    ListItemText,
    ListSubheader,
    Typography,
} from '@material-ui/core'

import * as OrganiserSelectors from 'redux/organiser/selectors'

import TrackResults from './TrackResults'

export default () => {
    const event = useSelector(OrganiserSelectors.event)
    const [selected, setSelected] = useState()

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Typography variant="subtitle1" gutterBottom>
                    Set the final, public results for each track here. These are
                    the results which will be visible in the project gallery,
                    provided that you have set it as public. You can drag and
                    rearrange projects within the "ranked" section of each track
                    to determine a rank for them. All projects left as unranked
                    will not have a public ranking attached to them. The
                    rankings for each track will be publicly displayed with the
                    following logic:
                </Typography>
                <ul>
                    <li>
                        <Typography variant="body1">
                            1st to 3rd: Displayed as 1st/2nd/3rd place
                        </Typography>
                    </li>
                    <li>
                        <Typography variant="body1">
                            4th to 10th: Displayed as Top 10
                        </Typography>
                    </li>
                    <li>
                        <Typography variant="body1">
                            50th percentile: Displayed as Top 50%, if not in the
                            Top 10
                        </Typography>
                    </li>
                    <li>
                        <Typography variant="body1">
                            Rest: No ranking shown
                        </Typography>
                    </li>
                </ul>
            </Grid>
            <Grid item xs={12} lg={3}>
                <Paper elevation={0}>
                    <List
                        style={{ maxHeight: '500px', overflow: 'scroll' }}
                        component="nav"
                        subheader={
                            <ListSubheader
                                style={{ background: 'white' }}
                                component="div"
                                id="nested-list-subheader"
                            >
                                Choose a track
                            </ListSubheader>
                        }
                    >
                        {event.tracks.map((track, index) => {
                            return (
                                <ListItem
                                    divider={index !== event.tracks.length - 1}
                                    selected={selected?.slug === track.slug}
                                    button
                                    key={track.slug}
                                    onClick={() => setSelected(track)}
                                >
                                    <ListItemText>{track.name}</ListItemText>
                                </ListItem>
                            )
                        })}
                    </List>
                </Paper>
            </Grid>
            <Grid item xs={12} lg={9}>
                {selected ? (
                    <TrackResults track={selected} event={event} />
                ) : (
                    <Typography variant="h6">Select a track</Typography>
                )}
            </Grid>
        </Grid>
    )
}

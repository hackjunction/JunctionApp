import React, { useState } from 'react'

import { useSelector } from 'react-redux'
import {
    Grid,
    Paper,
    List,
    ListItem,
    ListSubheader,
    ListItemText,
    Typography,
} from '@material-ui/core'
import * as OrganiserSelectors from 'redux/organiser/selectors'
import ChallengeResults from './ChallengeResults'

export default () => {
    const event = useSelector(OrganiserSelectors.event)
    const [selected, setSelected] = useState()

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Typography variant="subtitle1" gutterBottom>
                    Set the final, public results for each challenge here. These
                    are the results which will be visible in the project
                    gallery, provided that you have set it as public. You can
                    drag and rearrange projects within the "ranked" section of
                    each challenge to determine a rank for them. All projects
                    within the ranked section will have their exact rank
                    displayed in the project gallery - as a rule of thumb each
                    challenge should have 1-3 ranked projects, and all other
                    projects should be left in the unranked section.
                </Typography>
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
                                Choose a challenge
                            </ListSubheader>
                        }
                    >
                        {event.challenges.map((challenge, index) => {
                            return (
                                <ListItem
                                    divider={
                                        index !== event.challenges.length - 1
                                    }
                                    selected={selected?.slug === challenge.slug}
                                    button
                                    key={challenge.slug}
                                    onClick={() => setSelected(challenge)}
                                >
                                    <ListItemText>
                                        {challenge.name}
                                    </ListItemText>
                                </ListItem>
                            )
                        })}
                    </List>
                </Paper>
            </Grid>
            <Grid item xs={12} lg={9}>
                {selected ? (
                    <ChallengeResults challenge={selected} event={event} />
                ) : (
                    <Typography variant="h6">Select a challenge</Typography>
                )}
            </Grid>
        </Grid>
    )
}

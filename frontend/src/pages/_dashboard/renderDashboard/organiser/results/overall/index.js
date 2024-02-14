import React, { useCallback, useState } from 'react'
import { useSelector } from 'react-redux'
import {
    Grid,
    Paper,
    Typography,
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
} from '@material-ui/core'

import * as OrganiserSelectors from 'redux/organiser/selectors'

import DragDropList from 'components/generic/DragDropList'

const getAvatarStyle = index => {
    switch (index) {
        case 0:
            return {
                backgroundColor: '#ffd700',
            }
        case 1:
            return {
                backgroundColor: '#aaa9ad',
            }
        case 2:
            return {
                backgroundColor: '#cd7f32',
            }
        default:
            return {
                backgroundColor: 'rgba(0,0,0,0.5)',
            }
    }
}

export default () => {
    const rankingsOverall = useSelector(OrganiserSelectors.rankingsOverall)
    // const allProjects = useSelector(OrganiserSelectors.projects);
    const allProjectsMap = useSelector(OrganiserSelectors.projectsMap)

    const [dragDropState, setDragDropState] = useState({
        top: rankingsOverall?.rankings ?? [],
        bottom: [],
    })

    const renderRankedItem = useCallback(
        (id, index) => {
            const project = allProjectsMap[id]

            return (
                <ListItem>
                    <ListItemAvatar>
                        <Avatar style={getAvatarStyle(index)}>
                            {index + 1}
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={project?.name}
                        secondary={project?.punchline}
                    />
                </ListItem>
            )
        },
        [allProjectsMap],
    )

    const renderUnrankedItem = useCallback(
        (id, index) => {
            const project = allProjectsMap[id]

            return (
                <ListItem key={id}>
                    <ListItemAvatar>
                        <Avatar style={{ background: 'rgba(0,0,0,0.5)' }}>
                            ?
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={project?.name}
                        secondary={project?.punchline}
                    />
                </ListItem>
            )
        },
        [allProjectsMap],
    )

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Typography variant="subtitle1">
                    Set the overall results for the event here. If you are using
                    tracks, you should essentially list only the winner / Top 3
                    / Top 10 projects here.
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Paper elevation={0}>
                    <DragDropList
                        value={dragDropState}
                        onChange={setDragDropState}
                        topTitle="Ranked projects"
                        renderTopItem={renderRankedItem}
                        bottomTitle="Unranked projects"
                        renderBottomItem={renderUnrankedItem}
                    />
                </Paper>
            </Grid>
        </Grid>
    )
}

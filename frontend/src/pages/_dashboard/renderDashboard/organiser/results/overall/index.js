import React, { useCallback, useEffect, useMemo, useState } from 'react'
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
    const projectNameMap = Object.keys(allProjectsMap)
    console.log('projectNameMap :>> ', projectNameMap)
    console.log('rankingsOverall :>> ', rankingsOverall)

    // const [dragDropState, setDragDropState] = useState({
    //     top: [],
    //     bottom: [],
    // })

    // if (rankingsOverall?.rankings && projectNameMap) {
    //     console.log('setting dragDropState')
    //     setDragDropState(current => ({
    //         ...current,
    //         top: rankingsOverall?.rankings ?? [],
    //         bottom: projectNameMap,
    //     }))
    // }

    // const unrankedProjects = useMemo(() => {
    //     setDragDropState(current => ({
    //         ...current,
    //         top: rankingsOverall?.rankings ?? [],
    //         bottom: projectNameMap ?? [],
    //     }))
    // }, [rankingsOverall, projectNameMap])

    const [dragDropState, setDragDropState] = useState(
        useMemo(() => {
            return {
                top: rankingsOverall?.rankings ?? [],
                bottom: projectNameMap,
            }
        }, [rankingsOverall, projectNameMap]),
    )

    useEffect(() => {
        console.log('dragdropstate changing')
        setDragDropState(current => {
            console.log('current :>> ', current)
            return {
                top: rankingsOverall?.rankings ?? [],
                bottom: projectNameMap,
            }
        })
    }, [])

    console.log('dragDropState :>> ', dragDropState)

    const renderRankedItem = useCallback(
        (id, index) => {
            console.log('id of ranked item :>> ', id)
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
            console.log('id of UNRANKED item :>> ', id)
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
                    <h1>Debug</h1>
                    <h2>DragDropState</h2>
                    <pre>{JSON.stringify(dragDropState, null, 2)}</pre>
                    <h2>rankingsOverall</h2>
                    <pre>{JSON.stringify(rankingsOverall, null, 2)}</pre>
                    <br />
                    <br />
                    <br />
                    <br />
                    <h2>projectNameMap</h2>
                    <pre>{JSON.stringify(projectNameMap, null, 2)}</pre>
                </Paper>
            </Grid>
        </Grid>
    )
}

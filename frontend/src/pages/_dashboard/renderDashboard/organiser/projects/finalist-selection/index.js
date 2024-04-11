import React, { useEffect, useState } from 'react'

import {
    Grid,
    Box,
    Dialog,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Checkbox,
    Button,
    Paper,
    Typography,
} from '@material-ui/core'
import * as SnackbarActions from 'redux/snackbar/actions'

import { useDispatch, useSelector } from 'react-redux'

import PageHeader from 'components/generic/PageHeader'
import PageWrapper from 'components/layouts/PageWrapper'

import * as OrganiserSelectors from 'redux/organiser/selectors'
import * as AuthSelectors from 'redux/auth/selectors'

import EventsService from 'services/events'

import TextInput from 'components/inputs/TextInput'
import { useDebounce } from 'hooks/customHooks'

function not(a, b) {
    return a.filter(value => b.indexOf(value) === -1)
}

function intersection(a, b) {
    return a.filter(value => b.indexOf(value) !== -1)
}

export default () => {
    const event = useSelector(OrganiserSelectors.event)
    const projects = useSelector(OrganiserSelectors.projects)
    const projectsMap = useSelector(OrganiserSelectors.projectsMap)
    const dispatch = useDispatch()

    const idToken = useSelector(AuthSelectors.getIdToken)
    const [loading, setLoading] = useState(false)

    const [checked, setChecked] = useState([])
    const [left, setLeft] = useState([])
    const [filteredLeft, setFilteredLeft] = useState([])

    const [right, setRight] = useState([])
    const [filter, setFilter] = useState('')
    const debouncedFilter = useDebounce(filter, 300)

    const leftChecked = intersection(checked, left)
    const rightChecked = intersection(checked, right)

    useEffect(() => {
        const newLeft =
            projects
                ?.filter(project => !event?.finalists?.includes(project._id))
                .map(project => project._id) || []
        setLeft(newLeft)
        setFilteredLeft(newLeft)
        setRight(
            projects
                ?.filter(project => event?.finalists?.includes(project._id))
                .map(project => project._id) || [],
        )
    }, [projects, event])

    useEffect(() => {
        if (debouncedFilter) {
            const availableProjects = projects.filter(p => left.includes(p._id))
            setFilteredLeft(
                availableProjects
                    ?.filter(
                        project =>
                            project.name
                                ?.toLowerCase()
                                .includes(debouncedFilter.toLowerCase()) ||
                            project.punchline
                                ?.toLowerCase()
                                .includes(debouncedFilter.toLowerCase()),
                    )
                    .map(project => project._id) || [],
            )
        } else {
            setFilteredLeft(left)
        }
    }, [debouncedFilter, left])

    const handleToggle = value => () => {
        const currentIndex = checked.indexOf(value)
        const newChecked = [...checked]

        if (currentIndex === -1) {
            newChecked.push(value)
        } else {
            newChecked.splice(currentIndex, 1)
        }

        setChecked(newChecked)
    }

    const updateFinalists = projectIds => {
        if (idToken && event?.slug) {
            setLoading(true)
            EventsService.batchUpdateFinalists(idToken, event.slug, projectIds)
                .then(() => {
                    dispatch(SnackbarActions.success('Finalists updated!'))
                })
                .catch(() => {
                    dispatch(SnackbarActions.error('Oh no, an error happened.'))
                })
                .finally(() => {
                    setLoading(false)
                })
        }
    }

    const handleCheckedRight = () => {
        const newRight = right.concat(leftChecked)
        setRight(newRight)
        setLeft(not(left, leftChecked))
        setChecked(not(checked, leftChecked))
        updateFinalists(newRight)
    }

    const handleCheckedLeft = () => {
        setLeft(left.concat(rightChecked))
        const newRight = not(right, rightChecked)
        setRight(newRight)
        setChecked(not(checked, rightChecked))
        updateFinalists(newRight)
    }

    const customList = items => (
        <Paper>
            <List
                dense
                component="div"
                role="list"
                style={{ maxHeight: 500, overflowY: 'auto' }}
            >
                {items.length === 0 && (
                    <ListItem>
                        <ListItemText
                            primary={'Nothing added yet'}
                            secondary={
                                'Use the buttons to move projects to the finalists'
                            }
                        />
                    </ListItem>
                )}
                {items.map(value => {
                    const labelId = `transfer-list-item-${value}-label`

                    return (
                        <ListItem
                            key={value}
                            role="listitem"
                            button
                            onClick={handleToggle(value)}
                        >
                            <ListItemIcon>
                                <Checkbox
                                    checked={checked.indexOf(value) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{
                                        'aria-labelledby': labelId,
                                    }}
                                />
                            </ListItemIcon>
                            <ListItemText
                                id={labelId}
                                primary={projectsMap[value]?.name}
                                secondary={projectsMap[value]?.punchline}
                            />
                        </ListItem>
                    )
                })}
                <ListItem />
            </List>
        </Paper>
    )
    return (
        <PageWrapper>
            <PageHeader
                heading={''}
                subheading="Select projects that people have made it to the finals. Competitors will be able to vote on projects that are in the 'Finalists'."
            />
            <Grid container spacing={2}>
                <Grid item xs={5}>
                    <Typography variant="h5">All projects</Typography>
                    <Box style={{ marginBottom: 8 }}>
                        <TextInput
                            label="Filter"
                            placeholder="Search by project name or punchline"
                            onChange={value => setFilter(value)}
                            value={filter}
                        />
                    </Box>

                    {customList(filteredLeft)}
                </Grid>
                <Grid item xs={2} spacing={2}>
                    <Grid
                        container
                        direction="column"
                        style={{
                            height: 300,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Grid item>
                            <Button
                                variant="outlined"
                                size="small"
                                onClick={handleCheckedRight}
                                disabled={leftChecked.length === 0 || loading}
                                aria-label="move selected right"
                            >
                                -&gt;
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                variant="outlined"
                                size="small"
                                onClick={handleCheckedLeft}
                                disabled={rightChecked.length === 0 || loading}
                                aria-label="move selected left"
                            >
                                &lt;-
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={5}>
                    <Typography variant="h5" style={{ marginBottom: 48 }}>
                        Finalists
                    </Typography>

                    {customList(right)}
                </Grid>
            </Grid>
        </PageWrapper>
    )
}

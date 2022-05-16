import React, { useState, useCallback, useMemo } from 'react'

import {
    Paper,
    Grid,
    Box,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    Tooltip,
    Typography,
} from '@material-ui/core'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'
import EditIcon from '@material-ui/icons/Edit'
import SaveIcon from '@material-ui/icons/Save'
import CloseIcon from '@material-ui/icons/Close'
import TextInput from 'components/inputs/TextInput'
import Button from 'components/generic/Button'
import DateTimeInput from 'components/inputs/DateTimeInput'

export default ({ value, onChange }) => {
    const [titleValue, setTitleValue] = useState()
    const [startTimeValue, setStartTimeValue] = useState(new Date())
    const [editIndex, setEditIndex] = useState(-1)
    const [editValue, setEditValue] = useState({
        title: '',
        startTime: undefined,
    })

    const handleAdd = useCallback(() => {
        onChange(
            value.concat({
                title: titleValue,
                startTime: startTimeValue,
            }),
        )
        setTitleValue()
        setStartTimeValue(new Date())
    }, [value, titleValue, startTimeValue, onChange])

    const handleRemove = useCallback(
        index => {
            onChange(
                value.filter((item, idx) => {
                    return idx !== index
                }),
            )
        },
        [value, onChange],
    )

    const handleEditStart = useCallback(
        index => {
            setEditIndex(index)
            setEditValue(value[index])
        },
        [value],
    )

    const handleEditCancel = useCallback(() => {
        setEditIndex(-1)
        setEditValue()
    }, [])

    const handleEditSave = useCallback(() => {
        onChange(
            value.map((item, index) => {
                if (index === editIndex) {
                    return {
                        ...editValue,
                    }
                }
                return item
            }),
        )
        handleEditCancel()
    }, [value, editIndex, editValue, onChange, handleEditCancel])

    const isValid = useMemo(() => {
        return (
            titleValue &&
            startTimeValue &&
            value.filter(item => {
                return (
                    item.title === titleValue ||
                    item.startTime === startTimeValue
                )
            }).length === 0
        )
    }, [startTimeValue, titleValue, value])

    const renderListItem = (item, index) => {
        if (index === editIndex) {
            return (
                <ListItem key={`item-${index}`} divider>
                    <Grid container style={{ justifyContent: 'space-between' }}>
                        <Grid item xs={11}>
                            <TextInput
                                value={editValue.title}
                                onChange={value =>
                                    setEditValue({ ...editValue, title: value })
                                }
                                label={`Title of item ${index + 1}`}
                            />
                        </Grid>
                        <Grid item xs={1}>
                            <Tooltip title="Cancel">
                                <IconButton onClick={handleEditCancel}>
                                    <CloseIcon />
                                </IconButton>
                            </Tooltip>
                        </Grid>
                        <Grid item xs={11}>
                            <DateTimeInput
                                value={editValue.startTime}
                                onChange={value =>
                                    setEditValue({
                                        ...editValue,
                                        startTime: value,
                                    })
                                }
                            />
                        </Grid>
                        <Grid item xs={1}>
                            <Tooltip title="Save">
                                <IconButton
                                    disabled={
                                        !editValue ||
                                        editValue.title.length < 1 ||
                                        !editValue.startTime
                                    }
                                    onClick={handleEditSave}
                                >
                                    <SaveIcon />
                                </IconButton>
                            </Tooltip>
                        </Grid>
                    </Grid>
                </ListItem>
            )
        }

        return (
            <ListItem key={`item-${index}`} divider>
                <ListItemText
                    primary={item.title}
                    secondary={item.startTime.toString()}
                />
                <ListItemSecondaryAction>
                    <Tooltip title="Edit item">
                        <IconButton onClick={() => handleEditStart(index)}>
                            <EditIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Remove item">
                        <IconButton onClick={() => handleRemove(index)}>
                            <HighlightOffIcon />
                        </IconButton>
                    </Tooltip>
                </ListItemSecondaryAction>
            </ListItem>
        )
    }

    return (
        <Paper>
            <Box p={3}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextInput
                            label="Item title"
                            value={titleValue}
                            onChange={setTitleValue}
                        />
                        <Typography variant="caption">
                            The title of the timeline item
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <DateTimeInput
                            value={startTimeValue}
                            onChange={setStartTimeValue}
                        />
                        <Typography variant="caption">
                            The timeline item will start at this time
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Box
                            display="flex"
                            flexDirection="row"
                            justifyContent="flex-end"
                        >
                            <Button
                                disabled={!isValid}
                                onClick={handleAdd}
                                color="theme_turquoise"
                                variant="contained"
                            >
                                Add item
                            </Button>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <List>
                            {value &&
                                value
                                    .sort((a, b) =>
                                        a.startTime < b.startTime ? -1 : 1,
                                    )
                                    .map(renderListItem)}
                        </List>
                    </Grid>
                </Grid>
            </Box>
        </Paper>
    )
}

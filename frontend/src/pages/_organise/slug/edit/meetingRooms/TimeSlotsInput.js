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
    Checkbox,
} from '@material-ui/core'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'
import EditIcon from '@material-ui/icons/Edit'
import SaveIcon from '@material-ui/icons/Save'
import CloseIcon from '@material-ui/icons/Close'
import Button from 'components/generic/Button'
import DateTimeInput from 'components/inputs/DateTimeInput'

export default ({ value, onChange }) => {
    const [reserved, setReserved] = useState(false)
    const [start, setStart] = useState(new Date())
    const [end, setEnd] = useState(new Date())
    const [editIndex, setEditIndex] = useState(-1)
    const [editValue, setEditValue] = useState({
        reserved: false,
        start: undefined,
        end: undefined,
    })

    const handleAdd = useCallback(() => {
        onChange(
            value.concat({
                reserved,
                start,
                end,
            }),
        )
        setReserved(false)
        setStart(new Date())
        setEnd(new Date())
    }, [onChange, value, reserved, start, end])

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
        setEditValue({
            reserved: false,
            start: undefined,
            end: undefined,
        })
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
        return start && end && end > start
    }, [end, start])

    const renderListItem = (item, index) => {
        if (index === editIndex) {
            return (
                <ListItem key={`item-${index}`} divider>
                    <Grid container style={{ justifyContent: 'space-between' }}>
                        <Grid item xs={11}>
                            <DateTimeInput
                                value={editValue.start}
                                onChange={value =>
                                    setEditValue({
                                        ...editValue,
                                        start: value,
                                    })
                                }
                                timezone={'Europe/Helsinki'}
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
                                value={editValue.end}
                                onChange={value =>
                                    setEditValue({
                                        ...editValue,
                                        end: value,
                                    })
                                }
                                timezone={'Europe/Helsinki'}
                            />
                        </Grid>
                        <Grid item xs={1}>
                            <Tooltip title="Save">
                                <IconButton
                                    disabled={
                                        !editValue ||
                                        !editValue.start ||
                                        !editValue.end ||
                                        editValue.end <= editValue.start
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
                    primary={item.start.toString()}
                    secondary={item.end.toString()}
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
                        <DateTimeInput value={start} onChange={setStart} />
                        <Typography variant="caption">
                            The slot will start at this time
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <DateTimeInput value={end} onChange={setEnd} />
                        <Typography variant="caption">
                            The slot will end at this time
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
                                Add new time slot
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

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
import getSlug from 'speakingurl'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'
import EditIcon from '@material-ui/icons/Edit'
import SaveIcon from '@material-ui/icons/Save'
import CloseIcon from '@material-ui/icons/Close'
import TextInput from 'components/inputs/TextInput'
import Button from 'components/generic/Button'
import MarkdownInput from 'components/inputs/MarkdownInput'
import ImageUpload from 'components/inputs/ImageUpload'
import { SettingsBrightnessSharp } from '@material-ui/icons'
import TimeSlotsInput from './TimeSlotsInput'

export default ({ value, onChange }) => {
    const [name, setName] = useState(undefined)
    const [capacity, setCapacity] = useState(undefined)
    const [timeSlots, setTimeSlots] = useState(undefined)

    const [editIndex, setEditIndex] = useState(-1)
    const [editing, setEditing] = useState(false)

    const handleNameChange = useCallback(name => {
        setName(name)
    }, [])

    const handleAdd = useCallback(() => {
        handleNameChange(name)
        setEditing(true)
        setTimeSlots([])
    }, [handleNameChange, name])

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
            setEditing(true)
            setName(value[index].name)
            setCapacity(value[index].capacity)
            setTimeSlots(value[index].timeSlots)
        },
        [value],
    )

    const handleEditCancel = useCallback(() => {
        setEditIndex(-1)
        setEditing(false)
        setName(undefined)
        setCapacity(undefined)
        setTimeSlots(undefined)
    }, [])

    const handleEditDone = useCallback(() => {
        if (editIndex > -1) {
            onChange(
                value.map((item, index) => {
                    if (index === editIndex) {
                        return {
                            ...item,
                            name,
                            capacity,
                            timeSlots,
                        }
                    }
                    return item
                }),
            )
        } else {
            onChange(
                value.concat({
                    name,
                    capacity,
                    timeSlots,
                }),
            )
        }
        handleEditCancel()
    }, [
        editIndex,
        handleEditCancel,
        onChange,
        value,
        name,
        capacity,
        timeSlots,
    ])

    const isValid = useMemo(() => {
        return (
            name &&
            name.length > 0 &&
            capacity &&
            capacity > -1 &&
            timeSlots &&
            (editIndex === -1 ||
                value[editIndex].name !== name ||
                value[editIndex].capacity !== capacity ||
                value[editIndex].timeSlots !== timeSlots)
        )
    }, [capacity, editIndex, name, timeSlots, value])

    const renderListItem = (room, index) => {
        return (
            <ListItem key={room.name} divider>
                <ListItemText
                    primary={room.name}
                    secondary={`Capacity: ${room.capacity}`}
                />
                <ListItemSecondaryAction>
                    <Tooltip title="Edit room">
                        <IconButton onClick={() => handleEditStart(index)}>
                            <EditIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Remove room">
                        <IconButton onClick={() => handleRemove(index)}>
                            <HighlightOffIcon />
                        </IconButton>
                    </Tooltip>
                </ListItemSecondaryAction>
            </ListItem>
        )
    }

    const renderForm = () => (
        <>
            <Grid item xs={12}>
                <TextInput
                    label="Room name"
                    value={name}
                    onChange={handleNameChange}
                />
                <Typography variant="caption">
                    The unique publicly visible name of the meeting room.
                </Typography>
            </Grid>

            <Grid item xs={12}>
                <TextInput
                    label="Capacity"
                    type="number"
                    value={capacity}
                    onChange={value => setCapacity(parseInt(value))}
                />
                <Typography variant="caption">
                    The maximum number of people that can be in the room at the
                    same time.
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="heading">Time slots</Typography>
                <TimeSlotsInput value={timeSlots} onChange={setTimeSlots} />
            </Grid>

            <Grid item xs={12}>
                <Box
                    display="inline-flex"
                    flexDirection="row"
                    justifyContent="flex-start"
                >
                    <Button
                        onClick={handleEditCancel}
                        color="theme_white"
                        variant="contained"
                    >
                        Cancel
                    </Button>
                </Box>
                <Box
                    display="inline-flex"
                    flexDirection="row"
                    justifyContent="flex-end"
                    marginLeft="auto"
                >
                    <Button
                        disabled={!isValid}
                        onClick={handleEditDone}
                        color="theme_turquoise"
                        variant="contained"
                    >
                        Save
                    </Button>
                </Box>
            </Grid>
        </>
    )

    const renderListView = () => (
        <>
            <Grid item xs={12}>
                <List>{value && value.map(renderListItem)}</List>
            </Grid>
            <Grid item xs={12}>
                <Box display="flex" flexDirection="row" justifyContent="center">
                    <Button
                        onClick={handleAdd}
                        color="theme_turquoise"
                        variant="contained"
                    >
                        Add meeting room
                    </Button>
                </Box>
            </Grid>
        </>
    )

    return (
        <Paper>
            <Box p={3}>
                <Grid container spacing={3}>
                    {!editing ? renderListView() : renderForm()}
                </Grid>
            </Box>
        </Paper>
    )
}

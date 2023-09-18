import React, { useState, useCallback, useMemo } from 'react'
import moment from 'moment-timezone'
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
    const [start, setStart] = useState(moment())
    const [end, setEnd] = useState(moment())
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

    const handleEditStartTimeChange = newValue => {
        const startDate = moment(newValue).tz('Europe/Helsinki')
        const currentlySavedStartDate = editValue.start
            ? moment(editValue.start).tz('Europe/Helsinki')
            : moment().tz('Europe/Helsinki')
        const startTimeChanged =
            startDate.format() !== currentlySavedStartDate.format()
        const startMinutes = startDate.get('minute')
        const endDate = startDate.clone()
        if (startMinutes === 0) {
            endDate.minute(30)
        } else {
            endDate.minute(0)
            endDate.hour(startDate.get('hour') + 1)
        }
        setEditValue({
            // if startTime changes, then the new slot is always initially free
            reserved: startTimeChanged ? false : editValue.reserved,
            start: newValue,
            end: endDate.format(),
        })
    }

    const handleStartTimeChange = newValue => {
        const startDate = moment(newValue).tz('Europe/Helsinki')
        const startMinutes = startDate.get('minute')
        const endDate = startDate.clone()
        if (startMinutes === 0) {
            endDate.minute(30)
        } else {
            endDate.minute(0)
            endDate.hour(startDate.get('hour') + 1)
        }
        setStart(startDate)
        setEnd(endDate)
    }

    const isValid = useMemo(() => {
        return start && end
        // && end > start
    }, [end, start])


    const minutesOptions = [
        { value: 0, label: '00' },
        { value: 30, label: '30' },
    ]

    const formatTimeSlotStr = slot => {
        const start = moment(slot.start)
        const end = moment(slot.end)
        return `${start.format('D.M.YYYY')} / ${start.format(
            'H:mm',
        )} - ${end.format('H:mm')}`
    }

    const renderListItem = (item, index) => {
        if (index === editIndex) {
            return (
                <ListItem key={`item-${index}`} divider>
                    <Grid container style={{ justifyContent: 'space-between' }}>
                        <Grid item xs={11}>
                            <DateTimeInput
                                value={editValue.start}
                                onChange={handleEditStartTimeChange}
                                optionsMinutes={minutesOptions}
                                timezone={'Europe/Helsinki'}
                            />
                        </Grid>
                        <Grid item xs={1}>
                            <Tooltip title="Save">
                                <IconButton
                                    disabled={
                                        !editValue ||
                                        !editValue.start ||
                                        !editValue.end
                                        // || editValue.end <= editValue.start
                                    }
                                    onClick={handleEditSave}
                                >
                                    <SaveIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Cancel">
                                <IconButton onClick={handleEditCancel}>
                                    <CloseIcon />
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
                    primary={formatTimeSlotStr(item)}
                    secondary={item.reserved ? 'IS BOOKED' : ''}
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
                        <DateTimeInput
                            value={start}
                            onChange={handleStartTimeChange}
                            optionsMinutes={minutesOptions}
                            timezone={'Europe/Helsinki'}
                        />
                        <Typography variant="caption">
                            The slot will start at this time and end 30min
                            later. Slots can start 00 or 30
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
                                    .sort((a, b) => (a.start < b.end ? -1 : 1))
                                    .map(renderListItem)}
                        </List>
                    </Grid>
                </Grid>
            </Box>
        </Paper>
    )
}

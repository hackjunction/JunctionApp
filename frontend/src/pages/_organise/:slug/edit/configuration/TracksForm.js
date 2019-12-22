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

export default ({ value, onChange }) => {
    const [inputValue, setInputValue] = useState()
    const [slugValue, setSlugValue] = useState()
    const [editIndex, setEditIndex] = useState(-1)
    const [editValue, setEditValue] = useState()

    const handleNameChange = useCallback(name => {
        setInputValue(name)
        setSlugValue(getSlug(name))
    }, [])

    const handleAdd = useCallback(() => {
        onChange(
            value.concat({
                name: inputValue,
                slug: slugValue,
            })
        )
        setInputValue()
        setSlugValue()
    }, [value, inputValue, slugValue, onChange])

    const handleRemove = useCallback(
        index => {
            onChange(
                value.filter((item, idx) => {
                    return idx !== index
                })
            )
        },
        [value, onChange]
    )

    const handleEditStart = useCallback(
        index => {
            setEditIndex(index)
            setEditValue(value[index].name)
        },
        [value]
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
                        ...item,
                        name: editValue,
                    }
                }
                return item
            })
        )
        handleEditCancel()
    }, [value, editIndex, editValue, onChange, handleEditCancel])

    const isValid = useMemo(() => {
        return (
            inputValue &&
            slugValue &&
            value.filter(track => {
                return track.name === inputValue || track.slug === slugValue
            }).length === 0
        )
    }, [value, inputValue, slugValue])

    const renderListItem = (track, index) => {
        if (index === editIndex) {
            return (
                <ListItem key={track.slug || track.name} divider>
                    <TextInput
                        value={editValue}
                        onChange={setEditValue}
                        label={'Edit ' + track.name}
                    />
                    <Tooltip title="Cancel">
                        <IconButton onClick={handleEditCancel}>
                            <CloseIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Save">
                        <IconButton
                            disabled={!editValue || editValue.length === 0}
                            onClick={handleEditSave}
                        >
                            <SaveIcon />
                        </IconButton>
                    </Tooltip>
                </ListItem>
            )
        }

        return (
            <ListItem key={track.slug || track.name} divider>
                <ListItemText primary={track.name} secondary={track.slug} />
                <ListItemSecondaryAction>
                    <Tooltip title="Edit track name">
                        <IconButton onClick={() => handleEditStart(index)}>
                            <EditIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Remove track">
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
                            label="Track name"
                            value={inputValue}
                            onChange={handleNameChange}
                        />
                        <Typography variant="caption">
                            The unique publicly visible name of the track.
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextInput
                            label="Unique slug"
                            value={slugValue}
                            onChange={setSlugValue}
                        />
                        <Typography variant="caption">
                            A unique slug for the track. This will be used in
                            e.g. url paths related to this track.
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
                                Add track
                            </Button>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <List>{value.map(renderListItem)}</List>
                    </Grid>
                </Grid>
            </Box>
        </Paper>
    )
}

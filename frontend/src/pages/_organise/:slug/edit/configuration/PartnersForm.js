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
    const [descriptionValue, setDescriptionValue] = useState()
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
                description: descriptionValue,
            })
        )
        setInputValue()
        setSlugValue()
        setDescriptionValue()
    }, [value, inputValue, slugValue, descriptionValue, onChange])

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
        console.log('validating')
        return (
            inputValue &&
            slugValue &&
            descriptionValue &&
            value.filter(partner => {
                return (
                    partner.name === inputValue ||
                    partner.slug === slugValue ||
                    partner.description === descriptionValue
                )
            }).length === 0
        )
    }, [inputValue, slugValue, descriptionValue, value])

    const renderListItem = (partner, index) => {
        if (index === editIndex) {
            return (
                <ListItem key={partner.slug || partner.name} divider>
                    <TextInput
                        value={editValue}
                        onChange={setEditValue}
                        label={'Edit ' + partner.name}
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
            <ListItem key={partner.slug || partner.name} divider>
                <ListItemText primary={partner.name} secondary={partner.slug} />
                <ListItemSecondaryAction>
                    <Tooltip title="Edit partner name">
                        <IconButton onClick={() => handleEditStart(index)}>
                            <EditIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Remove partner">
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
                            label="Partner name"
                            value={inputValue}
                            onChange={handleNameChange}
                        />
                        <Typography variant="caption">
                            The unique publicly visible name of the partner.
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextInput
                            label="Unique slug"
                            value={slugValue}
                            onChange={setSlugValue}
                        />
                        <Typography variant="caption">
                            A unique slug for the partner. This will be used in
                            e.g. url paths related to this partner.
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextInput
                            label="Description"
                            value={descriptionValue}
                            onChange={setDescriptionValue}
                        />
                        <Typography variant="caption">
                            A description related to this partner.
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
                                Add a partner
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

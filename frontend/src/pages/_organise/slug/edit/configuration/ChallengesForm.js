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
    const [partnerValue, setPartnerValue] = useState()
    const [editIndex, setEditIndex] = useState(-1)
    const [editName, setEditName] = useState()
    const [editPartner, setEditPartner] = useState()

    const handleNameChange = useCallback(name => {
        setInputValue(name)
        setSlugValue(getSlug(name))
    }, [])

    const handleAdd = useCallback(() => {
        onChange(
            value.concat({
                name: inputValue,
                slug: slugValue,
                partner: partnerValue,
            })
        )
        setInputValue()
        setSlugValue()
        setPartnerValue()
    }, [value, inputValue, slugValue, partnerValue, onChange])

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
            setEditName(value[index].name)
            setEditPartner(value[index].partner)
        },
        [value]
    )

    const handleEditCancel = useCallback(() => {
        setEditIndex(-1)
        setEditName()
        setEditPartner()
    }, [])

    const handleEditDone = useCallback(() => {
        onChange(
            value.map((item, index) => {
                if (index === editIndex) {
                    return {
                        ...item,
                        name: editName,
                        partner: editPartner,
                    }
                }
                return item
            })
        )
        handleEditCancel()
    }, [value, editIndex, editName, editPartner, onChange, handleEditCancel])

    const isValid = useMemo(() => {
        return (
            partnerValue &&
            inputValue &&
            slugValue &&
            value.filter(challenge => {
                return (
                    challenge.name === inputValue ||
                    challenge.slug === slugValue
                )
            }).length === 0
        )
    }, [value, partnerValue, inputValue, slugValue])

    const renderListItem = (challenge, index) => {
        if (index === editIndex) {
            return (
                <ListItem key={challenge.slug || challenge.name} divider>
                    <Box flex="1" display="flex" flexDirection="column">
                        <TextInput
                            label="Challenge name"
                            value={editName}
                            onChange={setEditName}
                        />
                        <Box mt={1} />
                        <TextInput
                            label="Challenge partner"
                            value={editPartner}
                            onChange={setEditPartner}
                        />
                    </Box>
                    <Box pl={1}>
                        <Tooltip title="Cancel">
                            <IconButton onClick={handleEditCancel}>
                                <CloseIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Save edits">
                            <IconButton onClick={handleEditDone}>
                                <SaveIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </ListItem>
            )
        }

        return (
            <ListItem key={challenge.slug || challenge.name} divider>
                <ListItemText
                    primary={`${challenge.name} by ${challenge.partner}`}
                    secondary={challenge.slug}
                />
                <ListItemSecondaryAction>
                    <Tooltip title="Edit challenge">
                        <IconButton onClick={() => handleEditStart(index)}>
                            <EditIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Remove challenge">
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
                            label="Challenge name"
                            value={inputValue}
                            onChange={handleNameChange}
                        />
                        <Typography variant="caption">
                            The unique publicly visible name of the challenge.
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextInput
                            label="Unique slug"
                            value={slugValue}
                            onChange={setSlugValue}
                        />
                        <Typography variant="caption">
                            A unique slug for the challenge. This will be used
                            in e.g. url paths related to this challenge.
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextInput
                            label="Partner name"
                            value={partnerValue}
                            onChange={setPartnerValue}
                        />
                        <Typography variant="caption">
                            Who is the partner responsible for this challenge?
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
                                Add challenge
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

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
import Button from 'components/generic/Button'
import MarkdownInput from 'components/inputs/MarkdownInput'
import ImageUpload from 'components/inputs/ImageUpload'
import TextInput from 'components/inputs/TextInput'
import { OutboundLink } from 'react-ga'

export default ({ value, onChange }) => {
    //console.log("value", value)
    const [name, setName] = useState(undefined)
    const [slug, setSlug] = useState(undefined)
    const [partner, setPartner] = useState(undefined)
    const [description, setDescription] = useState(undefined)
    const [logo, setLogo] = useState(undefined)
    const [link, setLink] = useState(undefined)

    const [editIndex, setEditIndex] = useState(-1)
    const [editing, setEditing] = useState(false)

    const handleNameChange = useCallback(name => {
        setName(name)
        setSlug(getSlug(name))
    }, [])

    const handleAdd = useCallback(() => {
        handleNameChange(name)
        setEditing(true)
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
            setPartner(value[index].partner)
            setSlug(value[index].slug)
            setDescription(value[index].description)
            setLogo(value[index].logo)
            setLink(value[index].link)
        },
        [value],
    )

    const handleEditCancel = useCallback(() => {
        setEditIndex(-1)
        setEditing(false)
        setName(undefined)
        setPartner(undefined)
        setDescription(undefined)
        setLogo(undefined)
        setLink(undefined)
    }, [])

    const handleEditDone = useCallback(() => {
        if (editIndex > -1) {
            onChange(
                value.map((item, index) => {
                    if (index === editIndex) {
                        return {
                            ...item,
                            name,
                            partner,
                            slug,
                            description,
                            logo,
                            link,
                        }
                    }
                    return item
                }),
            )
        } else {
            onChange(
                value.concat({
                    name,
                    partner,
                    slug,
                    description,
                    logo,
                    link,
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
        partner,
        slug,
        description,
        logo,
        link,
    ])

    const isValid = useMemo(() => {
        return (
            partner &&
            name &&
            slug &&
            link &&
            value.filter((hackerpack, index) => {
                return (
                    index !== editIndex &&
                    (hackerpack.name === name || hackerpack.slug === slug)
                )
            }).length === 0
        )
    }, [editIndex, name, partner, slug, link, value])

    const renderListItem = (hackerpack, index) => {
        return (
            <ListItem key={hackerpack.slug || hackerpack.name} divider>
                <ListItemText
                    primary={`${hackerpack.name} by ${hackerpack.partner}`}
                    secondary={hackerpack.slug}
                />
                <ListItemSecondaryAction>
                    <Tooltip title="Edit hackerpack">
                        <IconButton onClick={() => handleEditStart(index)}>
                            <EditIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Remove hackerpack">
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
                <Typography variant="h5">Hackerpack Name *</Typography>
                <TextInput
                    label="Hackerpack name"
                    value={name}
                    onChange={handleNameChange}
                />
                <Typography variant="caption">
                    publicly visible name of the hackerpack.
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h5">Partner *</Typography>
                <TextInput
                    label="Partner name"
                    value={partner}
                    onChange={setPartner}
                />
                <Typography variant="caption">
                    Who is the partner responsible for this hackerpack?
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h5">Description</Typography>
                <MarkdownInput
                    label="Description"
                    value={description}
                    onChange={setDescription}
                    placeholder="Description goes here"
                />
                <Typography variant="caption">
                    Hackerpack description.
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h5">Logo</Typography>
                <Box width="100%" pt="33.33%" position="relative">
                    <ImageUpload
                        value={logo}
                        onChange={setLogo}
                        uploadUrl={`/api/upload/hackerpack/${slug}/icon/`}
                        resizeMode="contain"
                    />
                </Box>
                <Typography variant="caption">
                    Hackerpack logo.
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h5">Link *</Typography>
                <TextInput
                    label="Hackperpack link"
                    value={link}
                    onChange={setLink}
                />
                <Typography variant="caption">
                    Hackerpack link.
                </Typography>
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
                        color="primary"
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
                <List>{value.map(renderListItem)}</List>
            </Grid>
            <Grid item xs={12}>
                <Box display="flex" flexDirection="row" justifyContent="center">
                    <Button
                        onClick={handleAdd}
                        color="primary"
                        variant="contained"
                    >
                        Add hackerpack
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

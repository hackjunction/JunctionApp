import React, { useCallback } from 'react'

import { findIndex } from 'lodash-es'
import DeleteIcon from '@material-ui/icons/Delete'
import {
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    Box,
    Divider,
    Grid,
    Typography,
} from '@material-ui/core'

import Select from 'components/inputs/Select'
import TextInput from 'components/inputs/TextInput'
import Tag from 'components/generic/Tag'
import Button from 'components/generic/Button'

import { makeStyles } from '@material-ui/core/styles'
import { useFormField } from 'hooks/formHooks'

const COLORS = [
    'hotpink',
    'magenta',
    'red',
    'salmon',
    'orange',
    'gold',
    'lime',
    'greenyellow',
    'lightseagreen',
    'green',
    'powderblue',
    'cyan',
    'blue',
    'royalblue',
    'purple',
]

const ColorPreview = prop => {
    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <span
                style={{
                    height: '10px',
                    width: '10px',
                    borderRadius: '50%',
                    background: prop,
                    marginRight: '10px',
                }}
            />
            {prop}
        </div>
    )
}

const useStyles = makeStyles(theme => ({
    errorMessage: {
        color: theme.palette.error.main,
    },
}))

export default ({ value = [], fieldName, setFieldValue }) => {
    const classes = useStyles()
    const label = useFormField('', value => {
        if (!value || value.length === 0) {
            return 'Tag name is required'
        }
        if (value.length > 30) {
            return 'Tag name can be at most 30 characters'
        }
        if (findIndex(value, tag => tag.label === value) !== -1) {
            return `A tag with the name ${value} already exists`
        }

        return
    })
    const color = useFormField(undefined, value => {
        if (!value || value.length === 0) {
            return 'Tag color is required'
        }

        return
    })
    const description = useFormField('', value => {
        if (!value || value.length === 0) {
            return 'Please give a short description for your tag'
        }

        if (value.length > 200) {
            return 'Tag description must be under 200 characters'
        }
    })

    const resetForm = useCallback(() => {
        label.reset()
        color.reset()
        description.reset()
    }, [label, color, description])

    const handleAdd = useCallback(() => {
        const items = [label, color, description]
        let passing = true
        items.forEach(item => {
            const err = item.validate(item.value)
            if (err) {
                item.setError(err)
                passing = false
            }
        })

        if (!passing) {
            return
        } else {
            setFieldValue(
                fieldName,
                value.concat({
                    label: label.value,
                    color: color.value,
                    description: description.value,
                })
            )
            resetForm()
        }
    }, [value, fieldName, color, label, description, resetForm, setFieldValue])

    const handleDelete = useCallback(
        label => {
            setFieldValue(
                fieldName,
                value.filter(tag => tag.label !== label)
            )
        },
        [setFieldValue, fieldName, value]
    )

    const renderRows = () => {
        if (!value) return null
        return value.map((item, index) => [
            index !== 0 ? <Divider /> : null,
            <ListItem>
                <ListItemText
                    primary={
                        <Box mb={0.5}>
                            <Tag color={item.color} label={item.label} />
                        </Box>
                    }
                    secondary={item.description}
                />
                <ListItemSecondaryAction>
                    <IconButton
                        onClick={() => handleDelete(item.label)}
                        edge="end"
                        aria-label="comments"
                    >
                        <DeleteIcon />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>,
        ])
    }

    return (
        <Grid container spacing={3} alignItems="flex-end">
            <Grid item xs={12} md={6}>
                <TextInput
                    label="Tag name"
                    value={label.value}
                    onChange={label.setValue}
                />
                <Typography variant="caption" className={classes.errorMessage}>
                    {label.error}
                </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
                <Select
                    label="Tag color"
                    placeholder="Choose color"
                    value={color.value}
                    onChange={color.setValue}
                    options={COLORS.map(color => ({
                        label: ColorPreview(color),
                        value: color,
                    }))}
                />
                <Typography variant="caption" className={classes.errorMessage}>
                    {color.error}
                </Typography>
            </Grid>
            <Grid item xs={12} md={9}>
                <TextInput
                    label="Tag description"
                    value={description.value}
                    onChange={description.setValue}
                />
                <Typography variant="caption" className={classes.errorMessage}>
                    {description.error}
                </Typography>
            </Grid>
            <Grid item xs={12} md={3}>
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={handleAdd}
                >
                    Add
                </Button>
            </Grid>
            <Grid item xs={12}>
                <List>{renderRows()}</List>
            </Grid>
        </Grid>
    )
}

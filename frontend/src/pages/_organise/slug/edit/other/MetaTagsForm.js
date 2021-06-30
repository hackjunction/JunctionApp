import React, { useCallback } from 'react'

import { findIndex } from 'lodash-es'
import DeleteIcon from '@material-ui/icons/Delete'
import {
    List,
    ListItem,
    ListItemSecondaryAction,
    IconButton,
    Grid,
    Typography,
} from '@material-ui/core'

import Select from 'components/inputs/Select'
import TextInput from 'components/inputs/TextInput'
import Tag from 'components/generic/Tag'
import Button from 'components/generic/Button'

import { makeStyles } from '@material-ui/core/styles'
import { useFormField } from 'hooks/formHooks'

const useStyles = makeStyles(theme => ({
    errorMessage: {
        color: theme.palette.error.main,
    },
    metaDescription: {
        border: 3,
        borderRadius: 10,
        fontSize: 16,
        borderColor: 'red',
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

    const description = useFormField('', value => {
        if (!value || value.length === 0) {
            return 'Please give a short description for your tag'
        }

        if (value.length > 100) {
            return 'Tag description must be under 100 characters'
        }
    })

    const resetForm = useCallback(() => {
        label.reset()

        description.reset()
    }, [label, description])

    const handleAdd = useCallback(
        value => {
            console.log('description :>> ', description)
            const item = description
            let passing = true

            const err = item.validate(item.value)

            if (err) {
                item.setError(err)
                passing = false
            }

            if (!passing) {
                return
            } else {
                {
                    value
                        ? setFieldValue(fieldName, description.value)
                        : setFieldValue(fieldName, description.value)
                }
                resetForm()
            }
        },
        [fieldName, description, resetForm, setFieldValue],
    )

    const handleDelete = useCallback(
        description => {
            setFieldValue(fieldName, '')
        },
        [setFieldValue, fieldName],
    )

    const renderRows = () => {
        if (!value) return null
        console.log('value :>> ', value)
        return (
            <ListItem>
                <p>{value}</p>
                <ListItemSecondaryAction>
                    <IconButton
                        onClick={() => handleDelete(value)}
                        edge="end"
                        aria-label="comments"
                    >
                        <DeleteIcon />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        )
    }

    return (
        <Grid container spacing={3} alignItems="flex-end">
            <Grid item xs={12} md={6}>
                <Typography
                    variant="caption"
                    className={classes.errorMessage}
                ></Typography>
            </Grid>
            <Grid item xs={12} md={9}>
                <TextInput
                    label="Description metatag"
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
            <Grid item xs={12} className={classes.metaDescription}>
                <List>{renderRows()}</List>
            </Grid>
        </Grid>
    )
}

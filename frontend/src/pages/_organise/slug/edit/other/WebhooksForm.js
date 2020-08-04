import React, { useCallback } from 'react'

import { findIndex } from 'lodash-es'
import DeleteIcon from '@material-ui/icons/Delete'
import {
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    Divider,
    Grid,
    Typography,
    ListItemIcon,
    Switch,
} from '@material-ui/core'
import CheckIcon from '@material-ui/icons/Check'
import BlockIcon from '@material-ui/icons/Block'

import Select from 'components/inputs/Select'
import TextInput from 'components/inputs/TextInput'
import Button from 'components/generic/Button'

import { makeStyles } from '@material-ui/core/styles'
import { useFormField } from 'hooks/formHooks'

const ACTIONS = ['save', 'remove']

const RESOURCES = ['Project']

const useStyles = makeStyles(theme => ({
    errorMessage: {
        color: theme.palette.error.main,
    },
}))

export default ({ value = [], fieldName, setFieldValue }) => {
    const classes = useStyles()
    const name = useFormField('', value => {
        if (!value || value.length === 0) {
            return 'A webhook name is required'
        }
        if (value.length > 30) {
            return 'A name can be at most 30 characters'
        }
        if (findIndex(value, hook => hook.name === value) !== -1) {
            return `A webhook with the name ${value} already exists`
        }

        return
    })
    const resource = useFormField(undefined, value => {
        if (!value || value.length === 0) {
            return 'A resource is required'
        }

        return
    })
    const action = useFormField(undefined, value => {
        if (!value || value.length === 0) {
            return 'An action is required'
        }

        return
    })

    const url = useFormField('', value => {
        if (!value || value.length === 0) {
            return 'A URL is required'
        }

        return
    })

    const enabled = useFormField(false)

    const resetForm = useCallback(() => {
        name.reset()
        resource.reset()
        action.reset()
        url.reset()
        enabled.reset()
    }, [action, enabled, name, resource, url])

    const handleAdd = useCallback(() => {
        const items = [name, resource, action, url, enabled]
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
                    name: name.value,
                    resource: resource.value,
                    action: action.value,
                    url: url.value,
                    enabled: enabled.value,
                })
            )
            resetForm()
        }
    }, [
        name,
        resource,
        action,
        url,
        enabled,
        setFieldValue,
        fieldName,
        value,
        resetForm,
    ])

    const handleDelete = useCallback(
        name => {
            setFieldValue(
                fieldName,
                value.filter(webhook => webhook.name !== name)
            )
        },
        [setFieldValue, fieldName, value]
    )

    const renderRows = () => {
        if (!value) return null
        return value.map((item, index) => [
            index !== 0 ? <Divider /> : null,
            <ListItem>
                <ListItemIcon>
                    {item.enabled ? <CheckIcon /> : <BlockIcon />}
                </ListItemIcon>
                <ListItemText
                    primary={`${item.name} - On ${item.resource} ${item.action} it will call ${item.url} `}
                />
                <ListItemSecondaryAction>
                    <IconButton
                        onClick={() => handleDelete(item.name)}
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
                    label="Webhook name"
                    value={name.value}
                    onChange={name.setValue}
                />
                <Typography variant="caption" className={classes.errorMessage}>
                    {name.error}
                </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
                <Select
                    label="Which resource triggers this hook?"
                    placeholder="Choose resource"
                    value={resource.value}
                    onChange={resource.setValue}
                    options={RESOURCES.map(resource => ({
                        label: resource,
                        value: resource,
                    }))}
                />
                <Typography variant="caption" className={classes.errorMessage}>
                    {resource.error}
                </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
                <Select
                    label="Which action triggers this hook?"
                    placeholder="Choose an action"
                    value={action.value}
                    onChange={action.setValue}
                    options={ACTIONS.map(action => ({
                        label: action,
                        value: action,
                    }))}
                />
                <Typography variant="caption" className={classes.errorMessage}>
                    {action.error}
                </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
                <TextInput
                    label="Webhook URL"
                    value={url.value}
                    onChange={url.setValue}
                />
                <Typography variant="caption" className={classes.errorMessage}>
                    {url.error}
                </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
                <Switch
                    checked={enabled.value}
                    onChange={(e, value) => enabled.setValue(value)}
                    color="primary"
                    name="enabled"
                />
                <Typography variant="caption" className={classes.errorMessage}>
                    {enabled.error}
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

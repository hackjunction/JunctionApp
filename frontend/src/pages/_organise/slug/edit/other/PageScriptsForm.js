import React, { useCallback } from 'react'
import { useSelector } from 'react-redux'

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
    FormGroup,
    FormControlLabel,
    Checkbox,
} from '@material-ui/core'
import * as AuthSelectors from 'redux/auth/selectors'
import * as OrganiserSelectors from 'redux/organiser/selectors'
import EventService from 'services/events'

import Select from 'components/inputs/Select'
import Button from 'components/generic/Button'

import { makeStyles } from '@material-ui/core/styles'
import { useFormField } from 'hooks/formHooks'
import TextAreaInput from 'components/inputs/TextAreaInput'
import { EventPageScripts } from '@hackjunction/shared'

const useStyles = makeStyles(theme => ({
    errorMessage: {
        color: theme.palette.error.main,
    },
}))

export default ({ value = [], fieldName, setFieldValue }) => {
    const hasSuperAdmin = useSelector(AuthSelectors.hasSuperAdmin)
    const idToken = useSelector(AuthSelectors.getIdToken)
    const event = useSelector(OrganiserSelectors.event)

    const classes = useStyles()
    const availablePages = React.useMemo(() => {
        return EventPageScripts.ALLOWED_PAGE_SCRIPT_LOCATIONS.filter(
            location => !value?.find(l => l.page === location.id),
        )
    }, [value])

    const page = useFormField(undefined, value => {
        if (!value || value.length === 0) {
            return 'A page is required'
        }

        return
    })

    const scriptValue = useFormField('', value => {
        if (!value || value.length === 0) {
            return 'A script is required.'
        }

        return
    })

    const resetForm = useCallback(() => {
        page.reset()
        scriptValue.reset()
    }, [page, scriptValue])

    const handleAdd = useCallback(() => {
        const items = [page, scriptValue]
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
                    page: page.value,
                    script: scriptValue.value,
                    approved: false,
                }),
            )
            resetForm()
        }
    }, [page, scriptValue, setFieldValue, fieldName, value, resetForm])

    const handleDelete = useCallback(
        page => {
            setFieldValue(
                fieldName,
                value.filter(pageScript => pageScript.page !== page),
            )
        },
        [setFieldValue, fieldName, value],
    )

    const setScriptApproval = (index, approved) => {
        EventService.setPageScriptApproved(
            idToken,
            event.slug,
            approved,
            index,
        ).then(() => {
            const newValue = [...value]
            newValue[index].approved = approved
            setFieldValue(fieldName, newValue)
        })
    }

    const renderRows = () => {
        if (!value) return null
        return value.map((item, index) => [
            index !== 0 ? <Divider /> : null,
            <ListItem>
                <ListItemText
                    primary={
                        <TextAreaInput
                            label={`Page script: ${
                                EventPageScripts
                                    .ALLOWED_PAGE_SCRIPT_LOCATIONS_DICTIONARY[
                                    item.page
                                ]?.label
                            }`}
                            disabled={true}
                            value={item.script}
                            onChange={() => {}}
                        />
                    }
                    secondary={
                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={item.approved}
                                        disabled={!hasSuperAdmin}
                                        onChange={() =>
                                            setScriptApproval(
                                                index,
                                                !item.approved,
                                            )
                                        }
                                    />
                                }
                                label={
                                    item.approved
                                        ? 'This script was approved by Junction'
                                        : 'This script is not yet approved by Junction. Request approval by getting in touch with the platform maintainers..'
                                }
                            />
                        </FormGroup>
                    }
                />
                <ListItemSecondaryAction>
                    <IconButton
                        onClick={() => handleDelete(item.page)}
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
            <Grid item xs={12}>
                <Select
                    label="On which page should this script run?"
                    placeholder="Choose page"
                    value={page.value}
                    onChange={page.setValue}
                    options={availablePages.map(page => ({
                        label: page.label,
                        value: page.id,
                    }))}
                />
                <Typography variant="caption" className={classes.errorMessage}>
                    {page.error}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <TextAreaInput
                    placeholder="Insert tracking scripts here that should run on the selected page. For example, the Google Analytics tracking snippet could come here. Make sure you include both the script loading tag as well as the actual event tracking code. Snippets are not shared between pages, so you'll likely have similar initialization code in multiple page scripts."
                    label="Custom tracking script"
                    value={scriptValue.value}
                    onChange={scriptValue.setValue}
                />
                <Typography variant="caption" className={classes.errorMessage}>
                    {scriptValue.error}
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

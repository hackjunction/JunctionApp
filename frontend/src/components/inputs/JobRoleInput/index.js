import React, { useCallback, useState, useRef } from 'react'
import {
    Grid,
    Typography,
    Button,
    Box,
    FormControlLabel,
    RadioGroup,
    Radio,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    Divider,
} from '@material-ui/core'
import { Roles } from '@hackjunction/shared'
import { find } from 'lodash-es'
import { useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Select from 'components/inputs/Select'

import * as SnackbarActions from 'redux/snackbar/actions'

const useStyles = makeStyles(theme => ({
    radioGroup: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
}))

export default ({ value = [], onChange, autoFocus }) => {
    const dispatch = useDispatch()
    const classes = useStyles()
    const selectEl = useRef()
    const [years, setYears] = useState()
    const [role, setRole] = useState()

    const handleYearsChange = useCallback(event => {
        setYears(event.target.value)
    }, [])

    const handleAdd = useCallback(() => {
        const item = { role, years }

        if (find(value, item => item.role === role)) {
            dispatch(SnackbarActions.error(`You've already added ${role}`))
            return
        }

        onChange(value.concat(item))
        setRole()
        setYears()
        selectEl.current.focus()
    }, [role, years, value, onChange, dispatch])

    const handleRemove = useCallback(
        index => {
            onChange(
                value.filter((item, idx) => {
                    return index !== idx
                })
            )
        },
        [value, onChange]
    )

    const buttonDisabled = !years || !role

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Select
                    autoFocus={autoFocus}
                    innerRef={selectEl}
                    label="Choose a role"
                    placeholder="Type to search for roles"
                    options="role"
                    value={role}
                    onChange={setRole}
                />
            </Grid>
            <Grid item xs={4}>
                <Typography variant="subtitle1">Years of experience</Typography>
            </Grid>
            <Grid item xs={8}>
                <RadioGroup
                    className={classes.radioGroup}
                    aria-label="Years of experience"
                    value={years}
                    onChange={handleYearsChange}
                >
                    {Roles.experienceLevelsLabelsArray.map((label, index) => (
                        <FormControlLabel
                            key={label}
                            value={`${index + 1}`}
                            control={<Radio color="primary" />}
                            label={label}
                            labelPlacement="start"
                        />
                    ))}
                </RadioGroup>
            </Grid>
            <Grid item xs={12}>
                <Box
                    display="flex"
                    flexDirection="row"
                    justifyContent="flex-end"
                >
                    <Button
                        onClick={handleAdd}
                        disabled={buttonDisabled}
                        color="primary"
                        variant="contained"
                    >
                        Add
                    </Button>
                </Box>
            </Grid>
            <Grid item xs={12}>
                <List>
                    {value.map(({ role, years }, index) => [
                        <Divider key={role + '-divider'} />,
                        <ListItem key={role}>
                            <ListItemText
                                primary={role}
                                secondary={Roles.getLabelForExperienceLevel(
                                    years
                                )}
                            />
                            <ListItemSecondaryAction>
                                <Button
                                    onClick={() => handleRemove(index)}
                                    color="error"
                                >
                                    Remove
                                </Button>
                            </ListItemSecondaryAction>
                        </ListItem>,
                    ])}
                </List>
            </Grid>
        </Grid>
    )
}

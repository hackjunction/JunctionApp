import React, { useEffect, useRef } from 'react'
import FormControl from '@mui/material/FormControl'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import { useDispatch, useSelector } from 'react-redux'
import PageHeader from 'components/generic/PageHeader'
import GradientBox from 'components/generic/GradientBox'
import { Grid, Typography } from '@mui/material'

import * as DashboardSelectors from 'reducers/dashboard/selectors'
import * as DashboardActions from 'reducers/dashboard/actions'
import * as SnackbarActions from 'reducers/snackbar/actions'

export default () => {
    const dispatch = useDispatch()
    const registration_event = useSelector(DashboardSelectors.event)
    const registration = useSelector(DashboardSelectors.registration)

    const [checkboxState, setCheckboxState] = React.useState({})

    useEffect(() => {
        const copy = { ...checkboxState }
        registration.checklist.items.forEach((item, index) => {
            copy['checkbox' + (index + 1)] = item.checked
            setCheckboxState(copy)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleChange = async (event, index) => {
        setCheckboxState({
            ...checkboxState,
            [event.target.name]: event.target.checked,
        })
        const data = {
            checklistItem: {
                name: 'checkbox' + (index + 1),
                title: registration.checklist.items[index].title,
                checked: event.target.checked,
            },
            itemIndex: index,
        }
        dispatch(
            DashboardActions.updateRegistrationChecklist(
                registration_event.slug,
                registration._id,
                data,
            ),
        ).catch(error => {
            dispatch(SnackbarActions.error('Oops, something went wrong...'))
        })
    }

    const renderCheckListBlock = () => {
        return (
            <Grid item>
                <GradientBox color="theme_white" p={3}>
                    <FormControl>
                        <FormGroup>
                            {Object.keys(checkboxState).map((value, index) => (
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            color="primary"
                                            checked={checkboxState[value]}
                                            onChange={e =>
                                                handleChange(e, index)
                                            }
                                            name={value}
                                        />
                                    }
                                    key={index}
                                    label={
                                        <Typography
                                            style={
                                                checkboxState[value]
                                                    ? { color: 'grey' }
                                                    : {}
                                            }
                                        >
                                            {
                                                registration.checklist.items[
                                                    index
                                                ].title
                                            }
                                        </Typography>
                                    }
                                />
                            ))}
                        </FormGroup>
                    </FormControl>
                </GradientBox>
            </Grid>
        )
    }

    return (
        <>
            <PageHeader
                heading="Checklist"
                subheading="Tick the tasks you have successfully completed"
            />
            {renderCheckListBlock()}
        </>
    )
}

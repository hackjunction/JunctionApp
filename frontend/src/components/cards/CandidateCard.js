import React from 'react'
import junctionStyle from 'utils/styles'
import {
    Card,
    CardContent,
    CardActions,
    Typography,
    Grid,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Divider,
    AccordionActions,
    Chip,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
} from '@material-ui/core'

import FormControlJunction from 'components/inputs/FormControl'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Button from 'components/generic/Button'
import { makeStyles } from '@material-ui/core/styles'

import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import BooleanInput from 'components/inputs/BooleanInput'

import yupSchema from '@hackjunction/shared/schemas/validation/eventSchema'
import { FastField, Field, Form, Formik, useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { useMutation } from '@apollo/client'
import { UPDATE_EVENT } from 'graphql/mutations/eventOps'
import * as OrganiserSelectors from 'redux/organiser/selectors'
import * as OrganiserActions from 'redux/organiser/actions'
import * as SnackbarActions from 'redux/snackbar/actions'
import { forOwn } from 'lodash-es'
import ParticipantPreview from 'components/Participant/ParticipantPreview'

function CandidateCard() {
    const classes = junctionStyle()
    const [value, setValue] = React.useState('female')

    const handleChange = event => {
        setValue(event.target.value)
    }

    const dispatch = useDispatch()
    const event = useSelector(OrganiserSelectors.event)
    const { slug, _id } = event
    const [saveChanges, saveResult] = useMutation(UPDATE_EVENT, {
        onError: err => {
            const errors = err.graphQLErrors

            if (errors) {
                dispatch(
                    SnackbarActions.error('Unable to save changes', {
                        errorMessages: Object.keys(errors).map(
                            key => `${key}: ${errors[key].message}`,
                        ),
                        persist: false, // this could be the problem why errors messages persist? => solution: set to false
                    }),
                )
            } else {
                dispatch(SnackbarActions.error('Unable to save changes'))
            }
        },
        onCompleted: () => {
            dispatch(OrganiserActions.updateEvent(slug)).then(() =>
                dispatch(
                    SnackbarActions.success(
                        'Your changes were saved successfully',
                    ),
                ),
            )
        },
    })

    function onSubmit(values, actions) {
        const changed = {}
        forOwn(values, (value, field) => {
            if (event[field] !== value) {
                changed[field] = value
            }
        })
        saveChanges({
            variables: { _id, input: changed },
        })
        actions.setSubmitting(false)
    }

    const formik = useFormik({
        initialValues: {
            role: '',
        },
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2))
        },
    })

    return (
        <Card className="tw-bg-white tw-m-4 tw-text-left tw-rounded-lg tw-shadow-md tw-flex tw-flex-col tw-justify-between tw-min-h-576px">
            <CardContent className="tw-flex tw-flex-col tw-items-start tw-p-4 tw-gap-6">
                <ParticipantPreview />
                <Button color="outlined_button" variant="jOutlined">
                    Full application
                </Button>
                <div className="tw-flex tw-flex-col tw-gap-4 tw-w-full">
                    <form onSubmit={formik.handleSubmit}>
                        <FormControl component="fieldset" className="tw-w-full">
                            <FormLabel
                                component="legend"
                                className="tw-mb-4 tw-tracking-tight tw-font-medium tw-text-black tw-text-2xl"
                            >
                                Applied for
                            </FormLabel>
                            <RadioGroup
                                aria-label="role"
                                name="role"
                                value={formik.values.role}
                                onChange={formik.handleChange}
                                className="tw-flex tw-flex-col tw-gap-4"
                            >
                                <FormControlLabel
                                    value="UX Designer"
                                    control={
                                        <Radio
                                            className="tw-p-0"
                                            checkedIcon={
                                                <div className="tw-flex tw-items-center tw-justify-center tw-bg-gray-300 tw-w-8 tw-h-8 tw-rounded-full">
                                                    <span
                                                        className={`tw-w-5 tw-h-5 tw-rounded-full ${classes.bgPrimary}`}
                                                    ></span>
                                                </div>
                                            }
                                            icon={
                                                <span
                                                    className={classes.icon}
                                                />
                                            }
                                        />
                                    }
                                    label="UX Designer"
                                    className="tw-m-0 tw-border tw-border-gray-300 tw-border-solid tw-rounded-lg hover:tw-bg-gray-100 tw-p-4 tw-flex tw-items-center tw-gap-x-4"
                                />
                                <FormControlLabel
                                    value="Frontend Developer"
                                    control={
                                        <Radio
                                            className="tw-p-0"
                                            checkedIcon={
                                                <div className="tw-flex tw-items-center tw-justify-center tw-bg-gray-300 tw-w-8 tw-h-8 tw-rounded-full">
                                                    <span
                                                        className={`tw-w-5 tw-h-5 tw-rounded-full ${classes.bgPrimary}`}
                                                    ></span>
                                                </div>
                                            }
                                            icon={
                                                <span
                                                    className={classes.icon}
                                                />
                                            }
                                        />
                                    }
                                    label="Frontend Developer"
                                    className="tw-m-0 tw-border tw-border-gray-300 tw-border-solid tw-rounded-lg hover:tw-bg-gray-100 tw-p-4 tw-flex tw-items-center tw-gap-x-4"
                                />
                                <FormControlLabel
                                    value="Graphic Designer"
                                    control={
                                        <Radio
                                            className="tw-p-0"
                                            checkedIcon={
                                                <div className="tw-flex tw-items-center tw-justify-center tw-bg-gray-300 tw-w-8 tw-h-8 tw-rounded-full">
                                                    <span
                                                        className={`tw-w-5 tw-h-5 tw-rounded-full ${classes.bgPrimary}`}
                                                    ></span>
                                                </div>
                                            }
                                            icon={
                                                <span
                                                    className={classes.icon}
                                                />
                                            }
                                        />
                                    }
                                    label="Graphic Designer"
                                    className="tw-m-0 tw-border tw-border-gray-300 tw-border-solid tw-rounded-lg hover:tw-bg-gray-100 tw-p-4 tw-flex tw-items-center tw-gap-x-4"
                                />
                            </RadioGroup>
                        </FormControl>
                    </form>
                    <Button color="outlined_button" variant="jOutlinedBox">
                        <div className="tw-flex tw-flex-col tw-gap-2 tw-items-start tw-w-full">
                            <Typography
                                className=" tw-text-gray-600"
                                variant="body1"
                                component="p"
                            >
                                Applied to 3 more roles
                            </Typography>
                        </div>
                    </Button>
                </div>
            </CardContent>
            <CardActions className="tw-flex tw-gap-2 tw-justify-start tw-px-4 tw-pb-4 tw-pt-0">
                <Button variant="jContained" onClick={formik.submitForm}>
                    Accept
                </Button>
                <Button color="outlined_button" variant="jOutlined">
                    Decline
                </Button>
            </CardActions>
        </Card>
    )
}

export default CandidateCard

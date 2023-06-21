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
import { FastField, Field, Form, Formik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { useMutation } from '@apollo/client'
import { UPDATE_EVENT } from 'graphql/mutations/eventOps'
import * as OrganiserSelectors from 'redux/organiser/selectors'
import * as OrganiserActions from 'redux/organiser/actions'
import * as SnackbarActions from 'redux/snackbar/actions'
import { forOwn } from 'lodash-es'

function CandidateCard() {
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
    return (
        <Card className="tw-bg-white tw-m-4 tw-text-left tw-rounded-lg tw-shadow-md tw-h-672px tw-flex tw-flex-col tw-justify-between">
            <CardContent className="tw-flex tw-flex-col tw-p-0">
                <div className="tw-flex tw-items-center tw-gap-4">
                    <div className="tw tw-bg-gradient-to-r tw-from-teal-400 tw-to-blue-500 tw-w-24 tw-h-24 tw-rounded-full"></div>
                    <div className="tw-flex tw-flex-col tw-items-start tw-gap-2">
                        <Typography
                            className="tw-tracking-tight tw-font-medium"
                            variant="h5"
                            component="h5"
                        >
                            Alea Solano
                        </Typography>
                        <Typography
                            className="tw-tracking-tight tw-font-normal"
                            variant="h6"
                            component="h6"
                        >
                            UX Designer
                        </Typography>
                    </div>
                </div>
                <div className="tw-p-4 tw-flex tw-flex-col tw-gap-4">
                    <Typography
                        className="tw-tracking-tight tw-font-medium"
                        variant="h5"
                        component="h5"
                    >
                        Applied for
                    </Typography>
                    <div className="tw-flex tw-flex-col tw-gap-4">
                        {/* <FormControl component="fieldset">
                                    <FormLabel component="legend">
                                        Gender
                                    </FormLabel>
                                    <RadioGroup
                                        aria-label="gender"
                                        name="gender1"
                                        value={value}
                                        onChange={handleChange}
                                    >
                                        <FormControlLabel
                                            value="female"
                                            control={<Radio />}
                                            label="Female"
                                        />
                                        <FormControlLabel
                                            value="male"
                                            control={<Radio />}
                                            label="Male"
                                        />
                                        <FormControlLabel
                                            value="other"
                                            control={<Radio />}
                                            label="Other"
                                        />
                                        <FormControlLabel
                                            value="disabled"
                                            disabled
                                            control={<Radio />}
                                            label="(Disabled option)"
                                        />
                                    </RadioGroup>
                                </FormControl> */}
                        {/* <FormControlJunction
                                label="Published"
                                hint="Is this event visible to the public?"
                                error={form.errors[field.name]}
                                touched={form.touched[field.name]}
                            >
                                <RadioGroup
                                    aria-label="gender"
                                    name="gender1"
                                    value={value}
                                    onChange={handleChange}
                                >
                                    <FormControlLabel
                                        value="female"
                                        control={<Radio />}
                                        label="Female"
                                    />
                                    <FormControlLabel
                                        value="male"
                                        control={<Radio />}
                                        label="Male"
                                    />
                                    <FormControlLabel
                                        value="other"
                                        control={<Radio />}
                                        label="Other"
                                    />
                                    <FormControlLabel
                                        value="disabled"
                                        disabled
                                        control={<Radio />}
                                        label="(Disabled option)"
                                    />
                                </RadioGroup>
                            </FormControlJunction> */}
                        <Formik
                            initialValues={{
                                picked: '',
                            }}
                            onSubmit={async values => {
                                await new Promise(r => setTimeout(r, 500))
                                alert(JSON.stringify(values, null, 2))
                            }}
                        >
                            {({ values }) => (
                                <Form>
                                    <div
                                        role="group"
                                        aria-labelledby="my-radio-group"
                                    >
                                        <div className="tw-flex tw-items-center">
                                            <Field
                                                type="radio"
                                                name="picked"
                                                value="One"
                                            />
                                            <label className="tw-bg-red-500">
                                                One
                                            </label>
                                        </div>
                                        <label>
                                            <Field
                                                type="radio"
                                                name="picked"
                                                value="Two"
                                            />
                                            Two
                                        </label>
                                        <div>Picked: {values.picked}</div>
                                    </div>

                                    <button type="submit">Submit</button>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </CardContent>
            <CardActions className="tw-flex tw-gap-2 tw-justify-start tw-px-4 tw-pb-4 tw-pt-0">
                <Button variant="jContained">Accept</Button>
                <Button color="outlined_button" variant="jOutlined">
                    Decline
                </Button>
            </CardActions>
        </Card>
    )
}

export default CandidateCard

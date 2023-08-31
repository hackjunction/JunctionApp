import React, { useMemo, useState, useContext } from 'react'
import ReactDOM from 'react-dom'

import { Formik, FastField } from 'formik'
import { makeStyles } from '@material-ui/core/styles'
import { Box, Grid, Typography } from '@material-ui/core'
import * as yup from 'yup'
import { RegistrationFieldsCustom } from '@hackjunction/shared'

import BooleanInput from 'components/inputs/BooleanInput'
import Markdown from 'components/generic/Markdown'

import RegistrationQuestion from '../RegistrationQuestion'
import RegistrationBottomBar from '../RegistrationBottomBar'

import EventDetailContext from '../../context'

const useStyles = makeStyles(theme => ({
    wrapper: {
        backgroundColor: 'transparent',
        padding: 0,
        marginBottom: '200px',
    },
    question: {
        backgroundColor: 'white',
        marginTop: '1px',
        padding: theme.spacing(3),
        transition: 'all 0.2s ease',
        '&:focus-within': {
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(2),
        },
    },
    questionInner: {
        opacity: 0.6,
        '&:focus-within': {
            opacity: 1,
        },
    },
    radioGroupWrapper: {
        background: 'white',
        padding: theme.spacing(2),
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
}))

export default ({ section, onNext, nextLabel, onPrev, prevLabel, data }) => {
    console.log('section', section)
    const classes = useStyles()
    const { registration } = useContext(EventDetailContext)
    const [visible, setVisible] = useState(!section.conditional)

    const { initialValues, validationSchema } = useMemo(() => {
        return section.questions.reduce(
            (result, question) => {
                if (
                    RegistrationFieldsCustom.hasOwnProperty(question.fieldType)
                ) {
                    result.validationSchema[question.name] =
                        RegistrationFieldsCustom[
                            question.fieldType
                        ].validationSchema(question.fieldRequired, question)
                }
                if (
                    registration &&
                    registration.answers &&
                    registration.answers['CustomAnswers']
                ) {
                    registration.answers['CustomAnswers'].forEach(element => {
                        if (
                            element.section === section.name &&
                            element.key === question.name
                        ) {
                            if (question.fieldType === 'multiple-choice') {
                                // TODO fix so that that multiple choice options with "," in them don't cause bugs
                                result.initialValues[element.key] =
                                    element.value.split(',')
                            } else if (question.fieldType === 'boolean') {
                                result.initialValues[element.key] =
                                    element.value === 'true'
                            } else {
                                result.initialValues[element.key] =
                                    element.value
                            }
                        }
                    })
                }
                return result
            },
            {
                validationSchema: {},
                initialValues: {},
            },
        )
    }, [registration, section])
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={props => {
                return yup.lazy(values => {
                    return yup.object().shape(validationSchema)
                })
            }}
            onSubmit={(values, actions) => {
                onNext(values, section.name)
            }}
        >
            {({
                handleSubmit,
                handleChange,
                handleBlur,
                values,
                errors,
                dirty,
            }) => (
                <Box display="flex" flexDirection="column">
                    <Box
                        p={2}
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                    >
                        <Box>
                            <Markdown
                                source={section.description}
                                light
                                alignCenter
                            />
                        </Box>
                        {section.conditional && (
                            <Box className={classes.radioGroupWrapper}>
                                <Typography
                                    style={{ textAlign: 'center' }}
                                    variant="subtitle1"
                                >
                                    {section.conditional}
                                </Typography>
                                <BooleanInput
                                    alignCenter
                                    value={visible}
                                    onChange={setVisible}
                                />
                            </Box>
                        )}
                    </Box>
                    {visible ? (
                        <Box p={2} className={classes.wrapper}>
                            <Grid container spacing={0}>
                                {section.questions.map((question, index) => (
                                    <Grid
                                        item
                                        xs={12}
                                        key={question.name}
                                        className={classes.question}
                                    >
                                        {/* <div className={classes.questionInner}>
                                            <FastField
                                                autoFocus={index === 0}
                                                name={question.name}
                                                component={RegistrationQuestion}
                                                config={question}
                                                isCustom={true}
                                            />
                                        </div> */}
                                        <div className={classes.questionInner}>
                                            <FastField name={question.name}>
                                                {props => (
                                                    <RegistrationQuestion
                                                        autoFocus={index === 0}
                                                        config={question}
                                                        isCustom={true}
                                                        field={props.field}
                                                        form={props.form}
                                                    />
                                                )}
                                            </FastField>
                                        </div>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    ) : null}
                    {ReactDOM.createPortal(
                        <RegistrationBottomBar
                            prevLabel={prevLabel}
                            onPrev={onPrev}
                            nextLabel={nextLabel}
                            onNext={handleSubmit}
                            errors={errors}
                            dirty={dirty}
                        />,
                        document.body,
                    )}
                </Box>
            )}
        </Formik>
    )
}

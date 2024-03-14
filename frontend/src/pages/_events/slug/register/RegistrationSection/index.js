import React, { useMemo, useRef, useContext } from 'react'
import ReactDOM from 'react-dom'
import { RegistrationFields } from '@hackjunction/shared'
import { makeStyles } from '@material-ui/core/styles'
import { Box, Grid } from '@material-ui/core'
import { Formik, FastField } from 'formik'
import * as yup from 'yup'
import { useSelector } from 'react-redux'

import * as UserSelectors from 'redux/user/selectors'
import * as AuthSelectors from 'redux/auth/selectors'
import RegistrationQuestion from '../RegistrationQuestion'
import RegistrationBottomBar from '../RegistrationBottomBar'

import EventDetailContext from '../../context'

const useStyles = makeStyles(theme => ({
    wrapper: {
        backgroundColor: 'transparent',
        padding: 0,
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
}))

export default props => {
    const { fields, onNext, nextLabel, prevLabel, onPrev, data, isActive } =
        props
    const { event, registration } = useContext(EventDetailContext)
    const userProfile = useSelector(UserSelectors.userProfile)
    const idTokenData = useSelector(AuthSelectors.idTokenData)

    const classes = useStyles({ isActive })
    const mainRef = useRef(null)
    const { validationSchema, initialValues } = useMemo(() => {
        return fields.reduce(
            (result, field) => {
                const fieldParams = RegistrationFields.getField(field.fieldName)

                if (fieldParams) {
                    result.validationSchema[field.fieldName] =
                        fieldParams.validationSchema(field.require, event)
                    if (
                        registration &&
                        registration.answers &&
                        registration.answers[field.fieldName]
                    ) {
                        result.initialValues[field.fieldName] =
                            registration.answers[field.fieldName]
                    } else {
                        result.initialValues[field.fieldName] =
                            fieldParams.default(userProfile, idTokenData)
                    }
                }
                if (data.hasOwnProperty(field.fieldName)) {
                    result.initialValues[field.fieldName] =
                        data[field.fieldName]
                }
                return result
            },
            {
                validationSchema: {},
                initialValues: {},
            },
        )
    }, [fields, data, event, registration, userProfile, idTokenData])
    return (
        <Formik
            initialValues={initialValues}
            enableReinitialize={true}
            validationSchema={props => {
                return yup.lazy(values => {
                    return yup.object().shape(validationSchema)
                })
            }}
            onSubmit={(values, actions) => {
                onNext(values)
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
                <>
                    <Box display="flex" flexDirection="column" ref={mainRef}>
                        <Box p={2} className={classes.wrapper}>
                            <Grid container spacing={0}>
                                {fields.map((field, index) => (
                                    <Grid
                                        item
                                        xs={12}
                                        key={`${field.fieldName}-${index}`}
                                        className={classes.question}
                                    >
                                        <div className={classes.questionInner}>
                                            <FastField
                                                autoFocus={index === 0}
                                                name={field.fieldName}
                                                component={RegistrationQuestion}
                                                config={field.fieldConfig}
                                            />
                                        </div>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    </Box>
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
                </>
            )}
        </Formik>
    )
}

import React, { useEffect, useState } from 'react'
import { FastField, useFormikContext } from 'formik'
import { Box, Grid, Typography } from '@material-ui/core'
import RegistrationQuestion from 'pages/_events/slug/register/RegistrationQuestion'
import BooleanInput from '../BooleanInput'

export default ({ section, sectionAnswers = undefined }) => {
    const [visible, setVisible] = useState(true)

    useEffect(() => {
        setVisible(
            !section.conditional ||
                (!!sectionAnswers && !!sectionAnswers.value),
        )
    }, [sectionAnswers])

    const formikCont = useFormikContext()

    // console.log('Formik context from submission page', formikCont)

    useEffect(() => {
        if (visible === false) {
            section.questions.map(question => {
                formikCont.setFieldValue(question.name, '')
            })
        }
    }, [visible])

    return (
        <>
            <Grid item xs={12}>
                <h2>{section.label}</h2>
                <p>{section.description}</p>

                {section.conditional && (
                    <Box
                    // className={classes.radioGroupWrapper}
                    >
                        <Typography variant="subtitle1">
                            {section.conditional}
                        </Typography>
                        <BooleanInput value={visible} onChange={setVisible} />
                    </Box>
                )}
                {visible &&
                    section.questions.map((question, index) => (
                        <FastField name={question.name}>
                            {props => {
                                return (
                                    <RegistrationQuestion
                                        config={question}
                                        isCustom={true}
                                        field={props.field}
                                        form={props.form}
                                        key={question.name}
                                    />
                                )
                            }}
                        </FastField>
                    ))}
            </Grid>
        </>
    )
}

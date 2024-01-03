import React, { useEffect, useState } from 'react'
import { FastField, useFormikContext } from 'formik'
import { Box, Grid, Typography } from '@material-ui/core'
import RegistrationQuestion from 'pages/_events/slug/register/RegistrationQuestion'
import Switch from 'components/generic/Switch'

export default ({ section, sectionAnswers = undefined }) => {
    const [visible, setVisible] = useState(true)

    useEffect(() => {
        setVisible(
            !section.conditional ||
            (!!sectionAnswers && !!sectionAnswers.value),
        )
    }, [sectionAnswers])

    const formikCont = useFormikContext()

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
                    <Box>
                        <Typography variant="subtitle1">
                            {section.conditional}
                        </Typography>
                        <Switch
                            checked={visible}
                            onChange={setVisible}
                            checkedText="Yes"
                            uncheckedText="No"
                        />
                    </Box>
                )}
                <div className="tw-flex tw-flex-col tw-gap-6">
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
                </div>
            </Grid>
        </>
    )
}

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    FormControl,
    FormControlLabel,
    FormLabel,
    IconButton,
    Radio,
    RadioGroup,
    Typography,
} from '@material-ui/core'
import { Email } from '@material-ui/icons'
import { Field } from 'formik'
import { capitalize, toInteger, toString } from 'lodash-es'
import React, { useState } from 'react'
import { popupCenter } from 'utils/misc'
import junctionStyle from 'utils/styles'

const labels = {
    creativity: 'Creativity',
    innovation: 'Innovation',
    problemSolving: 'Problem Solving',
    companyFit: 'Company Fit',
    teamwork: 'Teamwork',
}

export default ({ scoreArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], category }) => {
    const classes = junctionStyle()
    const [selectedIndex, setSelectedIndex] = useState(null)

    const handleChange = index => {
        setSelectedIndex(index)
    }

    return (
        <Field name={category}>
            {({ field, form }) => (
                <FormControl
                    component="fieldset"
                    className="tw-w-full"
                    required
                >
                    <FormLabel
                        component="legend"
                        className="tw-mb-4 tw-tracking-tight tw-font-medium tw-text-black tw-text-base"
                    >
                        {labels[category]}
                    </FormLabel>
                    <RadioGroup
                        aria-label={category}
                        name={category}
                        value={field.value}
                        onChange={e => {
                            console.log(e.target.value)
                            form.setFieldValue(
                                field.name,
                                toInteger(e.target.value),
                            )
                        }}
                        className="tw-flex tw-flex-row tw-gap-2"
                    >
                        {scoreArray.map((score, index) => (
                            <Radio
                                checked={score === field.value}
                                onChange={() => handleChange(index)}
                                value={score}
                                className="tw-p-0"
                                checkedIcon={
                                    <div className="tw-flex tw-items-center tw-justify-center tw-bg-gray-300 tw-w-8 tw-h-8 tw-rounded-full">
                                        <span
                                            className={`tw-w-5 tw-h-5 tw-rounded-full ${classes.bgPrimary}`}
                                        ></span>
                                    </div>
                                }
                                icon={
                                    index < selectedIndex ? (
                                        <div className="tw-flex tw-items-center tw-justify-center tw-bg-gray-300 tw-w-8 tw-h-8 tw-rounded-full">
                                            <span
                                                className={`tw-w-5 tw-h-5 tw-rounded-full ${classes.bgPrimary}`}
                                            ></span>
                                        </div>
                                    ) : (
                                        <span className={classes.icon} />
                                    )
                                }
                            />
                        ))}
                    </RadioGroup>
                </FormControl>
            )}
        </Field>
    )
}

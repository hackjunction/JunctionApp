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
import React, { useEffect, useState } from 'react'
import { popupCenter } from 'utils/misc'
import junctionStyle from 'utils/styles'

// const labels = {
//     creativity: 'Creativity',
//     innovation: 'Innovation',
//     problemSolving: 'Problem Solving',
//     companyFit: 'Company Fit',
//     teamwork: 'Teamwork',
// }
const scoreArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

export default ({ category, label, onSelectionChange }) => {
    const classes = junctionStyle()
    const [selectedValue, setSelectedValue] = useState(null)
    const [selectedIndex, setSelectedIndex] = useState(null)

    const handleChange = index => {
        setSelectedIndex(index)
    }

    // useEffect(() => {
    //     onSelectionChange(selectedValue)
    // }, [selectedValue])

    return (
        // <Field name={category}>
        //     {({ field, form }) => (
        <FormControl component="fieldset" className="tw-w-full" required>
            <FormLabel
                component="legend"
                className="tw-mb-4 tw-tracking-tight tw-font-medium tw-text-black tw-text-base"
            >
                {label}
            </FormLabel>
            <RadioGroup
                aria-label={category}
                name={category}
                value={selectedValue}
                onChange={e => {
                    setSelectedValue(toInteger(e.target.value))
                    onSelectionChange(toInteger(e.target.value))
                }}
                className="tw-flex tw-flex-row tw-gap-2"
            >
                {scoreArray.map((score, index) => (
                    <Radio
                        checked={score === selectedValue}
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
        //     )}
        // </Field>
    )
}

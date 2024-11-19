import { FormControl, FormLabel, Radio, RadioGroup } from '@material-ui/core'
import _ from 'lodash'
import { toInteger } from 'lodash-es'
import React, { useState } from 'react'
import junctionStyle from 'utils/styles'

const scoreArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

export default ({ criteria, label, onSelectionChange, value = null }) => {
    const classes = junctionStyle()
    const [selectedValue, setSelectedValue] = useState(value)
    const [selectedIndex, setSelectedIndex] = useState(null)

    if (value && selectedIndex === null && _.includes(scoreArray, value)) {
        setSelectedIndex(scoreArray.indexOf(value))
    }

    const handleChange = index => {
        setSelectedIndex(index)
    }

    return (
        <FormControl component="fieldset" className="tw-w-full" required>
            <FormLabel
                component="legend"
                className="tw-mb-4 tw-tracking-tight tw-font-medium tw-text-black tw-text-base"
            >
                {label}
            </FormLabel>
            <RadioGroup
                aria-label={criteria}
                name={criteria}
                value={selectedValue}
                onChange={e => {
                    setSelectedValue(toInteger(e.target.value))
                    onSelectionChange(toInteger(e.target.value))
                }}
                className="tw-flex tw-flex-row tw-gap-2"
            >
                {scoreArray.map((score, index) => (
                    <Radio
                        id={`${criteria}-${score}`}
                        key={index}
                        checked={score === selectedValue}
                        onChange={() => handleChange(index)}
                        value={score}
                        className="tw-p-0"
                        checkedIcon={
                            <div className="tw-flex tw-items-center tw-justify-center tw-bg-gray-300 tw-rounded-full tw-w-5 tw-h-5 sm:tw-w-8 sm:tw-h-8 ">
                                <span
                                    className={`tw-w-5 tw-h-5 tw-rounded-full tw-flex tw-justify-center tw-items-center tw-text-sm tw-font-bold tw-text-white ${classes.bgPrimary}`}
                                >
                                    {score}
                                </span>
                            </div>
                        }
                        icon={
                            index < selectedIndex ? (
                                <div className="tw-flex tw-items-center tw-justify-center tw-bg-gray-300 tw-rounded-full tw-w-5 tw-h-5 sm:tw-w-8 sm:tw-h-8">
                                    <span
                                        className={`tw-w-5 tw-h-5 tw-rounded-full tw-flex tw-justify-center tw-items-center tw-text-sm tw-text-gray-400 ${classes.bgPrimary}`}
                                    >
                                        {score}
                                    </span>
                                </div>
                            ) : (
                                <span
                                    className={`tw-flex tw-justify-center tw-items-center tw-bg-gray-200 tw-text-sm tw-rounded-full tw-w-5 tw-h-5 sm:tw-w-8 sm:tw-h-8`}
                                >
                                    {score}
                                </span>
                            )
                        }
                    />
                ))}
            </RadioGroup>
        </FormControl>
    )
}

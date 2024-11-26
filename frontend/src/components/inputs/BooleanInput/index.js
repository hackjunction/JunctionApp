import React, { useState, useCallback, useEffect } from 'react'
import { Box, RadioGroup, Radio, FormControlLabel } from '@mui/material'

const BooleanInput = ({ value, onChange, alignCenter = false }) => {
    const [isYesChecked, setYesChecked] = useState(false)
    const [isNoChecked, setNoChecked] = useState(false)

    const strBoolToBoolean = (string, stateChanged = false) => {
        switch (string) {
            case 'true':
                setYesChecked(true)
                setNoChecked(false)
                if (stateChanged) onChange(true)
                break
            case 'false':
                setNoChecked(true)
                setYesChecked(false)
                if (stateChanged) onChange(false)
                break
            default:
                console.log('error')
        }
    }

    useEffect(() => {
        if (typeof value !== 'undefined') {
            if (typeof value === 'string') {
                strBoolToBoolean(value)
                return
            }
            setYesChecked(value)
            setNoChecked(!value)
        }
    }, [value])

    const handleChange = useCallback(
        e => {
            strBoolToBoolean(e.target.value, true)
        },
        [onChange],
    )

    return (
        <Box>
            <RadioGroup
                className={`flex flex-row flex-wrap ${
                    alignCenter ? 'justify-center' : 'justify-start'
                }`}
                aria-label="yes-no"
                value={value}
                onChange={handleChange}
            >
                <FormControlLabel
                    key={'yes'}
                    control={<Radio color="primary" />}
                    label={'Yes'}
                    labelPlacement="start"
                    value={true}
                    checked={isYesChecked}
                />
                <FormControlLabel
                    key={'no'}
                    control={<Radio color="primary" />}
                    label={'No'}
                    labelPlacement="start"
                    value={false}
                    checked={isNoChecked}
                />
            </RadioGroup>
        </Box>
    )
}

export default BooleanInput

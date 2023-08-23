import React, { useState, useCallback, useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import { Box, RadioGroup, Radio, FormControlLabel } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    radioGroup: ({ alignCenter }) => ({
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: alignCenter ? 'center' : 'flex-start',
    }),
}))

//Boolean radio buttons are on default unchecked. If value is already defined check the box

const BooleanInput = ({ value, onChange, alignCenter = false }) => {
    const classes = useStyles({ alignCenter })
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

    // TODO Probably could be done better. Value came as string for some reason, and didn't have time to debug it
    const handleChange = useCallback(
        e => {
            strBoolToBoolean(e.target.value, true)
        },
        [onChange],
    )

    return (
        <Box>
            <RadioGroup
                className={classes.radioGroup}
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

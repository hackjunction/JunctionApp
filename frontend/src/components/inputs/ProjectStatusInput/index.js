import React, { useCallback, useEffect, useState } from 'react'

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

const ProjectStatusInput = ({
    value = 'draft',
    onChange,
    alignCenter = false,
}) => {
    const classes = useStyles({ alignCenter })
    const [checked, setChecked] = useState(value)

    useEffect(() => {
        setChecked(value)
    }, [value])

    const handleChange = useCallback(
        e => {
            switch (e.target.value) {
                case 'draft':
                    onChange('draft')
                    break
                case 'final':
                    onChange('final')
                    break
                default:
                    console.log('error')
            }
        },
        [onChange],
    )

    return (
        <Box>
            <RadioGroup
                className={classes.radioGroup}
                aria-label="draft-or-final"
                value={value}
                onChange={handleChange}
            >
                <FormControlLabel
                    key={'draft'}
                    control={<Radio color="primary" />}
                    label={'Draft'}
                    labelPlacement="start"
                    value={'draft'}
                    checked={checked === 'draft'}
                />
                <FormControlLabel
                    key={'final'}
                    control={<Radio color="primary" />}
                    label={'Final'}
                    labelPlacement="start"
                    value={'final'}
                    checked={checked === 'final'}
                />
            </RadioGroup>
        </Box>
    )
}

export default ProjectStatusInput

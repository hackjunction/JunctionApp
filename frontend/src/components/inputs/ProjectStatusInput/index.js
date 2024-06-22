import React, { useCallback, useEffect, useState } from 'react'

import { Box, RadioGroup, Radio, FormControlLabel } from '@mui/material'

//Boolean radio buttons are on default unchecked. If value is already defined check the box

const ProjectStatusInput = ({
    value = 'draft',
    onChange,
    alignCenter = false,
}) => {
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
                className="flex flex-row flex-wrap center"
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

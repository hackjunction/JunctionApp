import React from 'react'

import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

import { useTranslation } from 'react-i18next'

export default () => {
    const { i18n } = useTranslation()

    const handleChange = event => {
        i18n.changeLanguage(event.target.value)
    }
    return (
        <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={i18n.language}
            onChange={handleChange}
            style={{ padding: '8px 0px 8px 16px' }}
            disableUnderline
        >
            {/* <MenuItem value={'fi'}>
                <span role="img" aria-label="fi">
                    🇫🇮
                </span>
            </MenuItem> */}

            <MenuItem value={'en'}>
                <span role="img" aria-label="en">
                    English
                </span>
            </MenuItem>
            <MenuItem value={'zh'}>
                <span role="img" aria-label="zh">
                    Chinese
                </span>
            </MenuItem>
        </Select>
    )
}

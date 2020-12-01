import React from 'react'

import Select from '@material-ui/core/Select'
import Box from '@material-ui/core/Box'
import MenuItem from '@material-ui/core/MenuItem'
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
            style={{ padding: '0 0 0 0' }}
            disableUnderline
        >
            {/* <MenuItem value={'fi'}>
                <span role="img" aria-label="fi">
                    🇫🇮
                </span>
            </MenuItem> */}

            <MenuItem value={'en'}>
                <span role="img" aria-label="en">
                    ENG
                </span>
            </MenuItem>
            <MenuItem value={'zh'}>
                <span role="img" aria-label="zh">
                    ZH
                </span>
            </MenuItem>
        </Select>
    )
}

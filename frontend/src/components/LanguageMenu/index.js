import React from 'react'

import Select from '@material-ui/core/Select'

import MenuItem from '@material-ui/core/MenuItem'
import { useTranslation } from 'react-i18next'

export default () => {
    const { i18n } = useTranslation()

    const handleChange = event => {
        i18n.changeLanguage(event.target.value)
    }
    console.log('i18n.language :>> ', i18n.language)
    return (
        <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={i18n.languages[0]}
            onChange={handleChange}
            style={{ padding: '0 0 0 0' }}
            disableUnderline
        >
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

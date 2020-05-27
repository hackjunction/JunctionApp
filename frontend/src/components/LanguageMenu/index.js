import React from 'react'

import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import { useTranslation } from 'react-i18next'

export default () => {
    const { t, i18n } = useTranslation() // eslint-disable-line

    const handleChange = event => {
        i18n.changeLanguage(event.target.value)
    }
    return (
        <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={i18n.language}
            onChange={handleChange}
            style={{ padding: '0 0 0 32px' }}
            disableUnderline
        >
            <MenuItem value={'fi'}>🇫🇮</MenuItem>
            <MenuItem value={'en'}>🇬🇧</MenuItem>
        </Select>
    )
}

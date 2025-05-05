import React from 'react'

import { Select, MenuItem, InputBase } from '@mui/material/'

import { useTranslation } from 'react-i18next'

export default () => {
    const { i18n } = useTranslation()
    console.log('LanguageMenu')
    console.log(i18n)
    console.log(i18n.language)
    const handleChange = event => {
        i18n.changeLanguage(event.target.value)
    }
    let currentLanguage
    if (i18n.language !== 'en' && i18n.language !== 'zh') {
        currentLanguage = 'en'
    } else {
        currentLanguage = i18n.language
    }
    return (
        <Select
            value={currentLanguage}
            onChange={handleChange}
            defaultValue={'en'}
            className="tw-border-2 tw-border-solid tw-border-black tw-bg-white tw-rounded-lg tw-pl-2"
            input={<InputBase disableUnderline />}
        >
            {/* <MenuItem value={'fi'}>
                <span role="img" aria-label="fi">
                    🇫🇮
                </span>
            </MenuItem> */}

            <MenuItem value={'en'}>
                <span role="img" aria-label="en">
                    EN 🇺🇸
                </span>
            </MenuItem>
            <MenuItem value={'zh'}>
                <span role="img" aria-label="zh">
                    ZH 🇨🇳
                </span>
            </MenuItem>
        </Select>
    )
}

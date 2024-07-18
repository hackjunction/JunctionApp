import React from 'react'

import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'

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
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={currentLanguage}
            onChange={handleChange}
            defaultValue={'en'}
            className="tw-text-black tw-border-1 tw-border-2 tw-border-solid tw-border-black tw-px-2 tw-py-0 tw-bg-white tw-rounded-lg"
            // style={{
            //     padding: '8px 0px 8px 16px',
            //     color: 'white',
            //     backgroundColor: 'black',
            // }}
            disableUnderline
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

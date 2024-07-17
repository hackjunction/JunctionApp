import React from 'react'

import Select from '@material-ui/core/Select'
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

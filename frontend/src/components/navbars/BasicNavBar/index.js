import React from 'react'
import UserAvatar from 'components/UserAvatar'
import LanguageMenu from 'components/LanguageMenu'

const BasicNavBar = () => {
    return (
        <div className="tw-w-full tw-p-2 tw-bg-wave-pattern tw-bg-black ">
            <div className={'tw-flex tw-justify-end tw-items-center'}>
                <LanguageMenu />
                <UserAvatar />
            </div>
        </div>
    )
}

export default BasicNavBar

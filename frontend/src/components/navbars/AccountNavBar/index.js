import React from 'react'
import { useSelector } from 'react-redux'
import UserMenu from 'components/UserMenu'
import * as UserSelectors from 'reducers/user/selectors'

const Header = () => {
    const userProfile = useSelector(UserSelectors.userProfile)
    return (
        <div className="w-full h-20 bg-white px-4">
            <div className="flex flex-row items-center justify-between h-full">
                <div>
                    <span className="text-lg text-black uppercase">
                        Hi, {userProfile?.firstName}
                    </span>
                </div>
                <div className="flex flex-row items-center">
                    <UserMenu />
                </div>
            </div>
        </div>
    )
}

export default Header

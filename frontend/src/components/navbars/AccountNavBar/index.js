import React from 'react'
import styles from './AccountNavBar.module.scss'

import { useSelector } from 'react-redux'

import UserMenu from 'components/UserMenu'
import * as UserSelectors from 'redux/user/selectors'

export default () => {
    const userProfile = useSelector(UserSelectors.userProfile)
    return (
        <div className={styles.wrapper}>
            <div className={styles.left}>
                <span className={styles.userName}>
                    Hi, {userProfile?.firstName}
                </span>
            </div>
            <div className={styles.right}>
                <UserMenu />
            </div>
        </div>
    )
}

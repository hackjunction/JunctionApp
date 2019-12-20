import React from 'react'
import { useSelector } from 'react-redux'
import * as OrganiserSelectors from 'redux/organiser/selectors'
import UserListItem from './index'

export default ({ userId }) => {
    const organisersMap = useSelector(OrganiserSelectors.organisersMap)
    return <UserListItem user={organisersMap[userId]} />
}

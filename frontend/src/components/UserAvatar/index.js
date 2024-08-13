import React from 'react'
import { useDispatch } from 'react-redux'
import { push } from 'connected-react-router'
import { useRouteMatch } from 'react-router'
import { Avatar, Box, IconButton } from '@material-ui/core'
import JunctionTheme from 'junctionTheme.js'
import { useMyProfilePreview } from 'graphql/queries/userProfile'

export default () => {
    const match = useRouteMatch()
    const [profile] = useMyProfilePreview()
    const dispatch = useDispatch()
    const color = JunctionTheme.palette

    const handleClick = () => {
        if (match.url === '/home') {
            dispatch(push(`dashboard/default/profile`))
        } else {
            dispatch(push(`${match.url}/profile`))
        }
    }

    return (
        <Box display="flex" flexDirection="row" alignItems="center">
            <div className="tw-rounded-full tw-border-8 tw-border-white">
                <IconButton onClick={handleClick}>
                    <Avatar
                        className="tw-w-12 tw-h-12"
                        src={profile?.avatar}
                        alt="Avatar"
                        style={{
                            border: `2px solid ${color['primary'].main}`,
                            borderRadius: '50%',
                        }}
                    />
                </IconButton>
            </div>
        </Box>
    )
}

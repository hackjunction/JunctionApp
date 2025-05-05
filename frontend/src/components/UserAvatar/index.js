import React from 'react'

import { useNavigate, useResolvedPath } from 'react-router'
import { Avatar, Box, IconButton } from '@mui/material'
import JunctionTheme from 'junctionTheme.js'
import { useMyProfilePreview } from 'graphql/queries/userProfile'

export default () => {
    const navigate = useNavigate()
    const url = useResolvedPath('').pathname
    const [profile] = useMyProfilePreview()
    const color = JunctionTheme.palette

    const handleClick = () => {
        if (url === '/home') {
            navigate(`../dashboard/default/profile`)
        } else {
            navigate(`${url}/profile`)
        }
    }

    return (
        <Box display="flex" flexDirection="row" alignItems="center">
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
        </Box>
    )
}

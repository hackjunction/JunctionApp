import React from 'react'
import { Box, Typography } from '@mui/material'

import Markdown from 'components/generic/Markdown'

import { OutboundLink } from 'react-ga'

export default ({ partner, title, subtitle, logo, link }) => {
    return (
        <Box className="flex flex-col item-center md:flex-row md:items-start">
            <Box p={3}>
                {logo && (
                    <img alt={partner} src={logo.url} className="w-[200px]" />
                )}
            </Box>
            <Box p={3}>
                <Typography variant="h5">{title}</Typography>
                <Typography>
                    <Markdown source={subtitle} />
                </Typography>
                <Box className={classes.outboundLink}>
                    <OutboundLink
                        eventLabel="myLabel"
                        to={link}
                        target="_blank"
                    ></OutboundLink>
                </Box>
            </Box>
        </Box>
    )
}

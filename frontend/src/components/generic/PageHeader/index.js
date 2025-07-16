import React from 'react'
import { Link, Typography, Box } from '@mui/material'

const PageHeader = ({
    heading,
    subheading = null,
    details = null,
    link = null,
    alignment = 'center',
}) => {
    const alignmentMap = {
        center: 'center',
        left: 'flex-start',
        right: 'flex-end',
    }

    return (
        <Box
            display="flex"
            flexDirection="column"
            gap={2}
            alignItems={alignmentMap[alignment]}
            textAlign={alignment}
        >
            <Typography
                variant="h3"
                component="h3"
                fontWeight="bold"
                sx={{ letterSpacing: '-0.5px' }}
            >
                {heading}
            </Typography>

            <Box display="flex" flexDirection="column" gap={1}>
                {subheading && (
                    <Typography
                        variant="h6"
                        component="h6"
                        fontWeight="medium"
                        sx={{ letterSpacing: '-0.25px' }}
                    >
                        {subheading}
                    </Typography>
                )}
                {details && (
                    <Typography variant="body1" color="secondary">
                        {details}
                    </Typography>
                )}
                {!!link && (
                    <Link
                        component="a"
                        target="_blank"
                        rel="noopener noreferrer"
                        href={link}
                    >
                        Open in new tab
                    </Link>
                )}
            </Box>
        </Box>
    )
}

export default PageHeader

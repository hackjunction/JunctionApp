import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import { Box, Typography } from '@material-ui/core'

// const useStyles = makeStyles(theme => ({
//     subheading: {
//         marginTop: theme.spacing(1),
//         marginLeft: theme.spacing(0.5),
//         fontFamily: 'Lato',
//     },
// }))

const PageHeader = ({
    heading,
    subheading = null,
    details = null,
    alignment = 'center',
}) => {
    const styling = {
        center: 'tw-items-center tw-text-center',
        left: 'tw-items-start tw-text-left',
        right: 'tw-items-end tw-text-right',
    }

    // const classes = useStyles()
    return (
        // <Box pb={2} pt={2}>
        <div className={`tw-flex tw-flex-col tw-gap-2 ${styling[alignment]}`}>
            <Typography
                className="tw-font-bold tw-tracking-tight"
                variant="h3"
                component="h3"
            >
                {heading}
            </Typography>
            <div className="tw-flex tw-gap-2">
                <Typography
                    className="tw-tracking-tight tw-font-medium"
                    variant="h6"
                    component="h6"
                >
                    {subheading}
                </Typography>
                <Typography variant="body1" color="secondary" component="p">
                    {details}
                </Typography>
            </div>
            {/* <Typography
                    className="tw-font-bold tw-tracking-tight"
                    variant="h3"
                    component="h3"
                >
                    {heading}
                </Typography>
                {subheading && (
                    <Typography
                        className="tw-text-lg tw-text-gray-600"
                        variant="body1"
                        component="p"
                    >
                        {subheading}
                    </Typography>
                )} */}
        </div>
        // </Box>
    )
}

export default PageHeader

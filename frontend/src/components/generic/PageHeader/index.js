import React from 'react'

import { Link, Typography } from '@material-ui/core'

const PageHeader = ({
    heading,
    subheading = null,
    details = null,
    link = null,
    alignment = 'center',
}) => {
    const styling = {
        center: 'tw-items-center tw-text-center',
        left: 'tw-items-start tw-text-left',
        right: 'tw-items-end tw-text-right',
    }

    return (
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
            </div>
        </div>
    )
}

export default PageHeader

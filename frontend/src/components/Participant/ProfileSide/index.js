import { Typography } from '@material-ui/core'
import React from 'react'

const index = ({ user = {} }) => {
    return (
        <>
            {user.industriesOfInterest?.length > 0 && (
                <div className="tw-rounded-lg tw-shadow-md tw-bg-white tw-p-8">
                    <Typography
                        className="tw-tracking-tight tw-font-medium"
                        variant="h5"
                        component="h5"
                    >
                        Industries of interest
                    </Typography>
                    <ul className="tw-p-0 tw-flex tw-flex-col tw-gap-2">
                        {user.industriesOfInterest.map(industry => (
                            <Typography
                                className="tw-text-lg tw-p-2 tw-list-disc tw-list-inside"
                                variant="body1"
                                component="li"
                                key={industry}
                            >
                                {industry}
                            </Typography>
                        ))}
                    </ul>
                </div>
            )}
            {user.themesOfInterest?.length > 0 && (
                <div className="tw-rounded-lg tw-shadow-md tw-bg-white tw-p-8">
                    <Typography
                        className="tw-tracking-tight tw-font-medium"
                        variant="h5"
                        component="h5"
                    >
                        Themes of interest
                    </Typography>
                    <ul className="tw-p-0 tw-flex tw-flex-col tw-gap-2">
                        {user.themesOfInterest.map(theme => (
                            <Typography
                                className="tw-text-lg tw-p-2 tw-list-disc tw-list-inside"
                                variant="body1"
                                component="li"
                                key={theme}
                            >
                                {theme}
                            </Typography>
                        ))}
                    </ul>
                </div>
            )}
        </>
    )
}

export default index

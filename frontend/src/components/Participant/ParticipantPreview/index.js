import { Typography } from '@material-ui/core'
import React from 'react'

export default ({
    viewMode = 'card',
    userData = {
        profile: {
            profilePicture: '',
            firstName: 'Alea',
            lastName: 'Solano',
            headline: 'Full Stack Developer',
        },
    },
}) => {
    const styling = {
        borderStyle: '',
        imageSize: '',
        alignment: 'tw-items-center',
    }

    if (userData.profile.profilePicture !== '') {
        styling.userProfile = {
            backgroundImage: `url(${userData.profile.profilePicture})`,
        }
    }

    switch (viewMode) {
        case 'list':
            styling.borderStyle =
                'tw-border tw-border-solid tw-border-gray-300 tw-p-4'
            styling.imageSize = 'tw-w-16 tw-h-16'
            break
        case 'profile':
            styling.borderStyle = ''
            styling.imageSize = 'tw-w-48 tw-h-48'
            styling.alignment = 'tw-items-start tw-flex-col tw--mt-24'
            break
        case 'card':
            styling.borderStyle = ''
            styling.imageSize = 'tw-w-24 tw-h-24'
            break
        default:
            break
    }
    return (
        <div
            className={`tw-flex tw-gap-4 tw-h- tw-rounded-lg ${styling.borderStyle} ${styling.alignment}`}
        >
            <div
                className={`tw-bg-gradient-to-r tw-from-teal-400 tw-to-blue-500 tw-rounded-full ${styling.imageSize}`}
                style={styling?.userProfile}
            ></div>
            <div className="tw-flex tw-flex-col tw-items-start tw-gap-2">
                <Typography
                    className="tw-tracking-tight tw-font-medium"
                    variant="h5"
                    component="h5"
                >
                    {userData.profile.firstName} {userData.profile.lastName}
                </Typography>
                <Typography
                    className="tw-tracking-tight tw-font-normal"
                    variant="h6"
                    component="h6"
                >
                    {userData.profile.headline}
                </Typography>
            </div>
        </div>
    )
}

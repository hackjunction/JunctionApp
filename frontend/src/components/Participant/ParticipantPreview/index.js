import { Typography } from '@material-ui/core'
import React from 'react'

export default ({ listView = false }) => {
    const styling = listView
        ? {
              borderStyle:
                  'tw-border tw-border-solid tw-border-gray-300 tw-p-4',
              imageSize: 'tw-w-16 tw-h-16',
          }
        : {
              borderStyle: '',
              imageSize: 'tw-w-24 tw-h-24',
          }
    return (
        <div
            className={`tw-flex tw-items-center tw-gap-4 tw-rounded-lg ${styling.borderStyle}`}
        >
            <div
                className={`tw tw-bg-gradient-to-r tw-from-teal-400 tw-to-blue-500 tw-rounded-full ${styling.imageSize}`}
            ></div>
            <div className="tw-flex tw-flex-col tw-items-start tw-gap-2">
                <Typography
                    className="tw-tracking-tight tw-font-medium"
                    variant="h5"
                    component="h5"
                >
                    Alea Solano
                </Typography>
                <Typography
                    className="tw-tracking-tight tw-font-normal"
                    variant="h6"
                    component="h6"
                >
                    UX Designer
                </Typography>
            </div>
        </div>
    )
}

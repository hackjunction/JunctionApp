import { Typography } from '@material-ui/core'
import Button from 'components/generic/Button'
import React from 'react'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import theme from 'junctionTheme'

export default ({
    maxRoles = 3,
    profileView = false,
    roles = [
        {
            role: 'UX designer',
            years: 3,
        },
    ],
}) => {
    let styling = profileView
        ? {
              masonryColumns: {
                  350: 1,
                  900: 2,
                  1440: 3,
              },
          }
        : {
              masonryColumns: {
                  350: 1,
              },
          }
    return (
        <div className="tw-flex tw-flex-col tw-gap-4">
            <Typography
                className="tw-tracking-tight tw-font-medium"
                variant="h5"
                component="h5"
            >
                Available roles
            </Typography>
            <ResponsiveMasonry
                columnsCountBreakPoints={{ ...styling.masonryColumns }}
            >
                <Masonry gutter={`${theme.spacing(2)}px`}>
                    {roles.slice(0, maxRoles).map(item => {
                        return (
                            <Button
                                color="outlined_button"
                                variant="jOutlinedBox"
                            >
                                <div className="tw-flex tw-flex-col tw-gap-2 tw-items-start tw-w-full">
                                    <Typography
                                        className="tw-font-semibold"
                                        variant="h6"
                                        component="h6"
                                    >
                                        {item.role}
                                    </Typography>
                                    <Typography
                                        className="tw-text-lg tw-text-gray-600"
                                        variant="body1"
                                        component="p"
                                    >
                                        {item.years} of experience
                                    </Typography>
                                </div>
                            </Button>
                        )
                    })}
                </Masonry>
            </ResponsiveMasonry>
            {roles.length > maxRoles && (
                <Button color="outlined_button" variant="jOutlinedBox">
                    <div className="tw-flex tw-flex-col tw-gap-2 tw-items-start tw-w-full">
                        <Typography
                            className="tw-text-lg tw-text-gray-600"
                            variant="body1"
                            component="p"
                        >
                            +3 more roles
                        </Typography>
                    </div>
                </Button>
            )}
        </div>
    )
}

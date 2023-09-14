import { Typography } from '@material-ui/core'
import Button from 'components/generic/Button'
import React from 'react'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import theme from 'junctionTheme'

export default ({
    onRoleClick = () => {},
    maxRoles = 2,
    profileView = false,
    teamRoles = [
        {
            role: 'UX designer',
        },
    ],
}) => {
    const styling = profileView
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

    const hiddenRolesCount = teamRoles?.length - maxRoles

    return (
        <div className="tw-flex tw-flex-col tw-gap-4">
            {teamRoles?.length > 0 ? (
                <>
                    <Typography
                        className="tw-tracking-tight"
                        variant="h6"
                        component="h6"
                    >
                        Available roles
                    </Typography>
                    <ResponsiveMasonry
                        columnsCountBreakPoints={{ ...styling.masonryColumns }}
                    >
                        <Masonry gutter={`${theme.spacing(2)}px`}>
                            {teamRoles
                                ?.slice(0, maxRoles)
                                .map((item, index) => {
                                    return (
                                        <Button
                                            key={index}
                                            color="outlined_button"
                                            variant="jOutlinedBox"
                                            onClick={onRoleClick}
                                        >
                                            <div className="tw-flex tw-flex-col tw-gap-2 tw-items-start tw-w-full">
                                                <Typography
                                                    className="tw-font-semibold tw-text-left"
                                                    variant="body1"
                                                    component="p"
                                                >
                                                    {item.role}
                                                </Typography>
                                            </div>
                                        </Button>
                                    )
                                })}
                        </Masonry>
                    </ResponsiveMasonry>
                    {hiddenRolesCount > 0 && (
                        <Button color="outlined_button" variant="jOutlinedBox">
                            <div className="tw-flex tw-flex-col tw-gap-2 tw-items-start tw-w-full">
                                <Typography
                                    className="tw-text-gray-600"
                                    variant="body1"
                                    component="p"
                                >
                                    {`${hiddenRolesCount} more role${
                                        hiddenRolesCount === 1 ? '' : 's'
                                    } available`}
                                </Typography>
                            </div>
                        </Button>
                    )}
                </>
            ) : (
                <Typography
                    className="tw-text-gray-600"
                    variant="body1"
                    component="p"
                >
                    No roles available
                </Typography>
            )}
        </div>
    )
}

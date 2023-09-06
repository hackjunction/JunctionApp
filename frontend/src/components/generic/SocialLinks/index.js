import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconButton, Typography } from '@material-ui/core'
import { Email } from '@material-ui/icons'
import React from 'react'
import { popupCenter } from 'utils/misc'
import junctionStyle from 'utils/styles'

export default ({ viewMode = '' }) => {
    const classes = junctionStyle()

    const styling = {
        displayHeader: true,
        alignment: '',
    }

    switch (viewMode) {
        case 'team':
            styling.displayHeader = true
            break
        case 'participant':
            styling.displayHeader = false
            styling.alignment = 'tw--ml-4'
            break
        default:
            break
    }

    return (
        <div className={`tw-flex tw-flex-col tw-gap-4 ${styling.alignment}`}>
            {styling.displayHeader && (
                <Typography
                    className="tw-tracking-tight tw-font-medium"
                    variant="h5"
                    component="h5"
                >
                    Connect with us
                </Typography>
            )}
            <div className="tw-flex tw-items-center">
                <FontAwesomeIcon
                    icon={['fab', 'telegram']}
                    onClick={() =>
                        popupCenter({
                            url: `https://google.com`,
                            title: 'test',
                        })
                    }
                    className={classes.socialIcon}
                    size="2x"
                />
                <FontAwesomeIcon
                    icon={['fab', 'discord']}
                    onClick={() =>
                        popupCenter({
                            url: `https://google.com`,
                            title: 'test',
                        })
                    }
                    className={classes.socialIcon}
                    size="2x"
                />
                <FontAwesomeIcon
                    icon={['fab', 'slack']}
                    onClick={() =>
                        popupCenter({
                            url: `https://google.com`,
                            title: 'test',
                        })
                    }
                    className={classes.socialIcon}
                    size="2x"
                />
                <IconButton
                    color="primary"
                    aria-label="Email"
                    className="tw-p-0"
                >
                    <Email className={classes.socialIcon} />
                </IconButton>
            </div>
        </div>
    )
}

import { IconButton, Typography } from '@material-ui/core'
import Button from 'components/generic/Button'
import React from 'react'
import TeamHeader from '../TeamHeader'
import TeamDescription from '../TeamDescription'
import TeamRoles from '../TeamRoles'
import TeamMembers from '../TeamMembers'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import junctionStyle from 'utils/styles'
import { popupCenter } from 'utils/misc'
import { Email } from '@material-ui/icons'
import SocialLinks from '../../generic/SocialLinks'

export default () => {
    const classes = junctionStyle()
    return (
        <div className="tw-flex tw-flex-col tw-gap-12">
            <div className="tw tw-bg-gradient-to-r tw-from-teal-400 tw-to-blue-500 tw-w-full tw-h-16 tw-rounded-lg"></div>
            <div className="tw-flex tw-flex-col tw-gap-8">
                <TeamHeader />
                <TeamDescription />
            </div>
            <TeamRoles maxRoles={9999} profileView />
            <TeamMembers viewModeStyle="list" />
            <SocialLinks />
            <div className="tw-flex tw-gap-4 tw-justify-start">
                <Button variant="jContained">Edit</Button>
                <Button color="outlined_button" variant="jOutlined">
                    Leave the team
                </Button>
            </div>
        </div>
    )
}

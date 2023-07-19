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
import { objToArr } from 'utils/dataModifiers'

export default ({
    teamData = {
        code: 'test-12',
        name: 'Test Team',
        complete: false,
        members: [],
        owner: 'auth0|something',
        meta: {
            'auth0|something': {
                profile: {
                    firstName: 'Test',
                    lastName: 'User',
                    email: 'testing@test.fake',
                    avatar: 'https://picsum.photos/200',
                    userId: 'auth0|something',
                },
                registration: {
                    status: 'checkedIn',
                },
            },
            'auth0|something-else': {
                profile: {
                    firstName: 'Test2',
                    lastName: 'User2',
                    email: 'dif@test.fake',
                    avatar: 'https://picsum.photos/200',
                    userId: 'auth0|something-else',
                },
                registration: {
                    status: 'checkedIn',
                },
            },
        },

        teamRoles: [
            { role: 'UX Designer' },
            { role: 'Developer' },
            { role: 'Product Manager' },
        ],
        tagline: 'This is a test team',
        description: 'This is a test team description',
        links: ['https://google.com'],
        //TBA
        challenge: 'Test',
    },
    onClickLeave,
    onClickEdit,
}) => {
    const teamMembersArr = [...objToArr(teamData.meta)]

    const classes = junctionStyle()
    return (
        <div className="tw-flex tw-flex-col tw-gap-12">
            <div className="tw tw-bg-gradient-to-r tw-from-teal-400 tw-to-blue-500 tw-w-full tw-h-16 tw-rounded-lg"></div>
            <div className="tw-flex tw-flex-col tw-gap-8">
                <TeamHeader
                    teamName={teamData.name}
                    teamChallenge={teamData.challenge}
                />
                <TeamDescription
                    teamTagline={teamData.tagline}
                    teamDescription={teamData.description}
                />
            </div>
            <TeamRoles
                maxRoles={9999}
                profileView
                teamRoles={teamData.teamRoles}
            />
            <TeamMembers viewModeStyle="list" teamMembers={teamMembersArr} />
            <SocialLinks />
            <div className="tw-flex tw-gap-4 tw-justify-start">
                <Button onClick={onClickEdit} variant="jContained">
                    Edit
                </Button>
                <Button
                    onClick={onClickLeave}
                    color="outlined_button"
                    variant="jOutlined"
                >
                    Leave the team
                </Button>
            </div>
        </div>
    )
}

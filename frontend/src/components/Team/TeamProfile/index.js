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
    enableActions = true,
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
        discord: null,
        telegram: null,
        email: null,
        //TBA
        challenge: 'Test',
    },
    onClickLeave,
    onClickEdit,
    onRoleClick = () => {},
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
                maxRoles={10}
                profileView
                teamRoles={teamData.teamRoles}
                onRoleClick={onRoleClick}
            />
            <TeamMembers viewModeStyle="list" teamMembers={teamMembersArr} />
            <div className="tw-flex tw-content-center tw-justify-start">
                {teamData?.discord && (
                    <FontAwesomeIcon
                        icon={['fab', 'discord']}
                        onClick={() =>
                            popupCenter({
                                url: teamData.discord,
                                title: 'Discord',
                            })
                        }
                        className={classes.socialIcon}
                        size="2x"
                    />
                )}
                {teamData?.telegram && (
                    <FontAwesomeIcon
                        icon={['fab', 'telegram']}
                        onClick={() =>
                            popupCenter({
                                url: teamData.telegram,
                                title: 'Telegram',
                            })
                        }
                        className={classes.socialIcon}
                        size="2x"
                    />
                )}
                {teamData?.email && (
                    <IconButton
                        color="primary"
                        aria-label="Email"
                        className="tw-p-0"
                        onClick={() =>
                            popupCenter({
                                url: `mailto:${teamData.email}`,
                                title: 'email',
                            })
                        }
                    >
                        <Email className={classes.socialIcon} />
                    </IconButton>
                )}
            </div>
            {/* TODO add socialLinks component from Damilare (@mrprotocoll) */}
            {/* <SocialLinks /> */}
            {enableActions && (
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
            )}
        </div>
    )
}
//TODO fix issue that doesn't let team owners leave their own team

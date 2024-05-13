import { IconButton } from '@material-ui/core'
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
import { objToArr } from 'utils/dataModifiers'
import PageWrapper from 'components/layouts/PageWrapper'

// TODO add socialLinks component from Damilare (@mrprotocoll)

export default ({
    enableActions = true,
    teamData = {},
    onClickLeave,
    onClickDelete = () => {},
    onClickEdit,
    onRoleClick = () => {},
    loading = false,
}) => {
    const teamMembersArr = [...objToArr(teamData.meta)]
    const membersCount = teamData.members.length

    const classes = junctionStyle()
    return (
        <PageWrapper loading={loading}>
            <div className="tw-flex tw-flex-col tw-gap-12">
                <div className="tw tw-bg-gradient-to-r tw-from-teal-400 tw-to-blue-500 tw-w-full tw-h-16 tw-rounded-lg"></div>
                <div className="tw-flex tw-flex-col tw-gap-8">
                    <TeamHeader
                        teamName={teamData.name}
                        teamChallenge={teamData.challenge}
                        teamCode={enableActions ? teamData.code : null}
                    />
                    <TeamDescription
                        teamSubtitle={teamData?.subtitle}
                        teamDescription={teamData?.description}
                        teamIdea={teamData?.ideaTitle}
                        teamIdeaDescription={teamData?.ideaDescription}
                    />
                </div>
                <TeamRoles
                    maxRoles={10}
                    profileView
                    teamRoles={teamData.teamRoles}
                    onRoleClick={onRoleClick}
                />
                <TeamMembers
                    viewModeStyle="list"
                    teamMembers={teamMembersArr}
                    enabledTeamMemberView={enableActions}
                />
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
                    {teamData?.slack && (
                        <FontAwesomeIcon
                            icon={['fab', 'slack']}
                            onClick={() =>
                                popupCenter({
                                    url: teamData.slack,
                                    title: 'Slack',
                                })
                            }
                            className={classes.socialIcon}
                            size="2x"
                        />
                    )}
                </div>
                {/* TODO add socialLinks component from Damilare (@mrprotocoll) */}
                {enableActions && (
                    <div className="tw-flex tw-gap-4 tw-justify-start">
                        <Button onClick={onClickEdit} variant="jContained">
                            Edit
                        </Button>
                        {membersCount > 0 ? (
                            <Button
                                onClick={onClickLeave}
                                color="outlined_button"
                                variant="jOutlined"
                            >
                                Leave the team
                            </Button>
                        ) : (
                            <Button
                                onClick={onClickDelete}
                                color="outlined_button"
                                variant="jOutlined"
                            >
                                Delete the team
                            </Button>
                        )}
                    </div>
                )}
            </div>
        </PageWrapper>
    )
}
//TODO fix issue that doesn't let team owners leave their own team

import { IconButton, Typography } from '@material-ui/core'

import Button from 'components/generic/Button'
import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useRouteMatch } from 'react-router'

import TeamHeader from '../TeamHeader'
import TeamDescription from '../TeamDescription'
import TeamRoles from '../TeamRoles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import junctionStyle from 'utils/styles'
import { popupCenter } from 'utils/misc'
import { Email } from '@material-ui/icons'
import { objToArr } from 'utils/dataModifiers'
import PageWrapper from 'components/layouts/PageWrapper'
import { gradientRandomizer } from 'utils/stylingHelpers'
import * as SnackbarActions from 'redux/snackbar/actions'
import * as OrganiserActions from 'redux/organiser/actions'
import * as DashboardActions from 'redux/dashboard/actions'

// TODO add socialLinks component from Damilare (@mrprotocoll)

export default ({
    enableActions = true,
    teamData = {},
    onRoleClick = () => {},
    onCancel = () => {},
    slug = '',
}) => {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [teamMemberToRemove, setTeamMemberToRemove] = useState('')

    const [teamMembersArr, setTeamMembersArr] = useState([
        ...objToArr(teamData.meta),
    ])
    const membersCount = teamData.members.length

    const styling = {
        borderStyle: 'tw-border tw-border-solid tw-border-gray-300 tw-p-4',
        imageSize: 'tw-w-16 tw-h-16',
        alignment: 'tw-items-center',
        userProfile: {},
    }

    // TODO add way to remove team members
    // const onClickRemove = (userId) => {
    //     console.log("delete", slug, teamData.code, userId)
    // }

    // const onClickDelete = () => {
    //     console.log("delete")
    // }

    // const handleRemove = useEffect(() => {
    //     console.log('delete', slug, teamData?.code, teamMemberToRemove)
    //     setLoading(true)
    //     dispatch(
    //         DashboardActions.organiserRemoveMemberFromTeam(
    //             slug,
    //             teamData.code,
    //             teamMemberToRemove,
    //         ),
    //     )
    //         .then(team => {
    //             console.log('removed succesfully.', team)
    //             dispatch(OrganiserActions.updateTeamsForEvent(slug))
    //         })
    //         .then(() => {
    //             console.log(
    //                 'teams updated',
    //                 teamMembersArr.filter(
    //                     t => t.profile.userId !== teamMemberToRemove,
    //                 ),
    //             )
    //             setTeamMembersArr(
    //                 teamMembersArr.filter(
    //                     t => t.profile.userId !== teamMemberToRemove,
    //                 ),
    //             )
    //             dispatch(
    //                 SnackbarActions.success(
    //                     'removed ' +
    //                         teamMemberToRemove +
    //                         ' from team ' +
    //                         teamData?.code,
    //                 ),
    //             )
    //         })
    //         .catch(() => {
    //             dispatch(
    //                 SnackbarActions.error(
    //                     'Something went wrong... please try again.',
    //                 ),
    //             )
    //         })
    //         .finally(() => {
    //             setTeamMemberToRemove('')
    //             setLoading(false)
    //         })
    // }, [teamMemberToRemove, slug, teamData?.code, dispatch])

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
                {teamMembersArr?.map(userProfile => {
                    console.log(
                        'userProfile.profile?.avatar',
                        userProfile.profile?.avatar,
                    )
                    return (
                        <div
                            className={`tw-flex tw-justify-between tw-rounded-lg ${styling.borderStyle} ${styling.alignment}`}
                        >
                            <div className="tw-flex tw-gap-4 tw-items-end">
                                <div
                                    className={`tw-bg-gradient-to-r ${gradientRandomizer()} tw-rounded-full ${
                                        styling.imageSize
                                    } tw-bg-cover`}
                                    style={{
                                        backgroundImage: `url(${userProfile.profile?.avatar})`,
                                    }}
                                ></div>
                                <div className="tw-flex tw-flex-col tw-items-start tw-gap-1">
                                    <Typography
                                        className="tw-tracking-tight tw-font-medium"
                                        variant="h5"
                                        component="h5"
                                    >
                                        {userProfile.profile.firstName}{' '}
                                        {userProfile.profile.lastName}
                                    </Typography>
                                </div>
                            </div>
                            {membersCount > 0 ? (
                                <Button
                                    onClick={() =>
                                        setTeamMemberToRemove(
                                            userProfile.profile.userId,
                                        )
                                    }
                                    color="error"
                                    variant="contained"
                                >
                                    remove from team
                                </Button>
                            ) : (
                                <Button
                                    onClick={() =>
                                        setTeamMemberToRemove(
                                            userProfile.profile.userId,
                                        )
                                    }
                                    color="error"
                                    variant="contained"
                                >
                                    Delete the team
                                </Button>
                            )}
                        </div>
                    )
                })}
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
                <div className="tw-p-4">
                    <Button
                        onClick={onCancel}
                        color="primary"
                        variant="contained"
                    >
                        cancel
                    </Button>
                </div>
            </div>
        </PageWrapper>
    )
}

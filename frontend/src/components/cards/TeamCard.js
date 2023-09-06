import React from 'react'
import { Card, CardContent, CardActions, Typography } from '@material-ui/core'
import Button from 'components/generic/Button'
import 'react-multi-carousel/lib/styles.css'
import TeamHeader from 'components/Team/TeamHeader'
import TeamRoles from 'components/Team/TeamRoles'

function TeamCard({
    teamData = {},
    onClick,
    onClickSeeMore = onClick,
    onClickApply,
    disableActions = false,
}) {
    const styling = {
        cardHover: '',
    }

    if (onClick) {
        styling.cardHover = 'tw-cursor-pointer hover:tw-shadow-lg'
    }

    return (
        <Card
            onClick={onClick}
            className={`tw-bg-white tw-m-4 tw-text-left tw-rounded-lg tw-shadow-md tw-h-600px tw-flex tw-flex-col tw-justify-between ${styling.cardHover}`}
        >
            <CardContent className="tw-flex tw-flex-col tw-p-0">
                <div className="tw-bg-gradient-to-r tw-from-teal-400 tw-to-blue-500 tw-w-full tw-h-16 tw-rounded-lg"></div>
                <div className="tw-p-4 tw-flex tw-flex-col tw-gap-4">
                    <TeamHeader
                        viewMode="gallery"
                        teamName={teamData.name}
                        teamChallenge={teamData.challenge}
                    />
                    {teamData.userIsApplicant && <div>Applied</div>}
                    {teamData?.ideaTitle && teamData?.ideaDescription && (
                        <div className="tw-flex tw-flex-col tw-gap-2">
                            <div className="tw-flex tw-gap-2">
                                <Typography variant="body1" component="p">
                                    Working on:
                                </Typography>
                                <Typography
                                    className="tw-font-semibold"
                                    variant="body1"
                                    component="p"
                                >
                                    {teamData.ideaTitle}
                                </Typography>
                            </div>
                            <div className="tw-flex tw-gap-2">
                                <Typography variant="body1" component="p">
                                    {teamData.ideaDescription.length > 50
                                        ? `${teamData.ideaDescription.substr(
                                              0,
                                              50,
                                          )}...`
                                        : teamData.ideaDescription}
                                </Typography>
                            </div>
                        </div>
                    )}
                    <TeamRoles teamRoles={teamData.teamRoles} />
                </div>
            </CardContent>
            <CardActions className="tw-flex tw-justify-end tw-items-center tw-px-4 tw-pb-4 tw-pt-0">
                {disableActions ? null : (
                    <Button
                        onClick={e => {
                            onClickApply()
                            e.stopPropagation()
                        }}
                        variant="jContained"
                        disabled={teamData.userIsApplicant}
                    >
                        Apply
                    </Button>
                )}
                <Button
                    onClick={e => {
                        onClickSeeMore()
                        e.stopPropagation()
                    }}
                    color="outlined_button"
                    variant="jOutlined"
                >
                    See more
                </Button>
            </CardActions>
        </Card>
    )
}

export default TeamCard

import React from 'react'
import junctionStyle from 'utils/styles'
import {
    Card,
    CardContent,
    CardActions,
    Typography,
    Grid,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Divider,
    AccordionActions,
    Chip,
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Button from 'components/generic/Button'
import { makeStyles } from '@material-ui/core/styles'

import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import TeamHeader from 'components/Team/TeamHeader'
import TeamRoles from 'components/Team/TeamRoles'
import { useDispatch } from 'react-redux'
import { push } from 'connected-react-router'
import { useRouteMatch } from 'react-router'

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
            className={`tw-bg-white tw-m-4 tw-text-left tw-rounded-lg tw-shadow-md tw-min-h-576px tw-flex tw-flex-col tw-justify-between ${styling.cardHover}`}
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
                    <TeamRoles teamRoles={teamData.teamRoles} />
                </div>
            </CardContent>
            <CardActions className="tw-flex tw-gap-2 tw-justify-start tw-px-4 tw-pb-4 tw-pt-0">
                <Button
                    onClick={e => {
                        onClickApply()
                        e.stopPropagation()
                    }}
                    variant="jContained"
                    disabled={teamData.userIsApplicant || disableActions}
                >
                    Apply
                </Button>
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

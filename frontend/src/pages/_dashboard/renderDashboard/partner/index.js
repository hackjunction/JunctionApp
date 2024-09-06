import React from 'react'

import { useRouteMatch, useLocation } from 'react-router'
import RateReviewIcon from '@material-ui/icons/RateReview'
import { makeStyles } from '@material-ui/core/styles'
import {
    // Hidden,
    Typography,
} from '@material-ui/core'

import SidebarLayout from 'components/layouts/SidebarLayout'
import BasicNavBar from 'components/navbars/BasicNavBar'
import DefaultImage from 'assets/images/dashboardDefault.jpg'

import Image from 'components/generic/Image'

import ProjectsPage from './projects'
import { useTranslation } from 'react-i18next'

const useStyles = makeStyles(theme => ({
    sidebarTop: {
        padding: theme.spacing(3),
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    sidebarLogo: {
        width: '100%',
        objectFit: 'contain',
    },
}))

export default ({
    event,
    originalAlertCount,
    originalAlerts,
    shownPages,
    lockedPages,
}) => {
    const classes = useStyles()
    const match = useRouteMatch()
    const location = useLocation()
    // const [alertCount, setAlertCount] = useState(originalAlertCount)
    // const [alerts, setAlerts] = useState(originalAlerts)
    const { t } = useTranslation()

    return (
        <SidebarLayout
            baseRoute={match.url}
            location={location}
            sidebarTopContent={
                <div className={classes.sidebarTop}>
                    <Image
                        className={classes.sidebarLogo}
                        // publicId={
                        //     event && event.logo ? event.logo.publicId : ''
                        // }
                        transformation={{
                            width: 200,
                        }}
                        defaultImage={DefaultImage}
                    />
                    <Typography variant="button" style={{ color: 'white' }}>
                        Partner
                    </Typography>
                </div>
            }
            topContent={<BasicNavBar />}
            routes={[
                {
                    key: 'partner_review',
                    path: '',
                    exact: true,
                    icon: <RateReviewIcon />,
                    // icon: (
                    //     <Badge badgeContent={alertCount} color="primary">
                    //         <DashboardIcon />
                    //     </Badge>
                    // ),
                    label: t('Review_projects_'),
                    component: () => {
                        return <ProjectsPage event={event} />
                        // return DefaultPage({ alerts })
                    },
                },
                // {
                //     key: 'Review',
                //     path: '/review',
                //     // hidden: !shownPages?.reviewingByScoreCriteria,
                //     locked: lockedPages.reviewing,
                //     lockedDescription: 'Reviewing closed',
                //     exact: false,
                //     icon: <RateReviewIcon />,
                //     label: t('Review_projects_'),
                //     component: () => {
                //         return <ProjectsPage event={event} />
                //     },
                // },
                // TODO rework meetings, consider using rally.co
                // {
                //     key: 'meetings',
                //     path: '/calendar',
                //     exact: true,
                //     hidden: !shownPages?.meetings,
                //     icon: <EventIcon />,
                //     label: 'Meetings',
                //     component: CalendarPage,
                // },
                // {
                //     key: 'hackerpack',
                //     path: '/hackerpack',
                //     exact: true,
                //     icon: <AmpStoriesIcon />,
                //     hidden: !shownPages?.hackerPack,
                //     label: t('Hackerpack_'),
                //     component: HackerpackPage,
                // },
                //Experimental
                // {
                //     key: 'recruitment',
                //     path: '/recruitment',
                //     exact: false,
                //     icon: <WorkIcon />,
                //     label: 'Recruitment',
                //     component: RecruitmentPage,
                //     Hidden: !shownPages?.experimental,
                //     locked: true,
                //     lockedDescription: 'Currently unavailable',
                // },
                // {
                //     key: 'map',
                //     path: '/map',
                //     exact: false,
                //     icon: <PlaceIcon />,
                //     hidden: !shownPages?.experimental,
                //     label: 'Map',
                //     component: MapPage,
                // },
                // {
                //     key: 'challenges',
                //     path: '/challenges',
                //     hidden: !shownPages?.experimental,
                //     exact: true,
                //     icon: <FormatListBulletedIcon />,
                //     label: 'Challenges',
                //     component: ChallengesIndex,
                // },
                // {
                //     key: 'chat',
                //     path: '/chat',
                //     hidden: !shownPages?.experimental,
                //     exact: true,
                //     icon: <QuestionAnswerSharp />,
                //     label: 'Chat',
                //     component: Chat,
                // },
            ]}
        />
    )
}

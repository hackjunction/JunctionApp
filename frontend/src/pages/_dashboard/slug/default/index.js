import React, {useState} from 'react'
import { useRouteMatch } from 'react-router-dom'

import { Typography, Box, Grid, Dialog } from '@material-ui/core'

import PageHeader from 'components/generic/PageHeader'
import { Helmet } from 'react-helmet'
import config from 'constants/config'

import RegistrationStatusBlock from './Blocks/RegistrationStatusBlock'
import ProjectBlock from './Blocks/ProjectBlock'
import TeamStatusBlock from './Blocks/TeamStatusBlock'
import VisaInvitationBlock from './Blocks/VisaInvitationBlock'
import TravelGrantStatusBlock from './Blocks/TravelGrantStatusBlock'
import GavelReviewingBlock from './Blocks/GavelReviewingBlock'
//import PartnerReviewingBlock from './Blocks/PartnerReviewingBlock'
import ReviewingPeriodBlock from './Blocks/ReviewingPeriodBlock'
import CertificateBlock from './Blocks/CertificateBlock'
import EventOverBlock from './Blocks/EventOverBlock'
import SocialMediaBlock from './Blocks/SocialMediaBlock'
import EventTimeline from 'pages/_events/slug/default/EventTimeline'
import TimeLineBlock from './Blocks/TimeLineBlock'
import AlertBlock from './Blocks/AlertBlock'
import ProjectsGrid from 'components/projects/ProjectsGrid'
import ProjectDetail from 'components/projects/ProjectDetail'
import EventPageScriptIFrame from 'components/events/EventPageScriptIFrame'
import { EventPageScripts } from '@hackjunction/shared'
import { useSelector } from 'react-redux'
import * as DashboardSelectors from 'redux/dashboard/selectors'
import * as AuthSelectors from 'redux/auth/selectors'
import * as UserSelectors from 'redux/user/selectors'


export default ({ alerts }) => {
    const [selected, setSelected] = useState(false)
    const match = useRouteMatch()
    const user = useSelector(UserSelectors.userProfile)
    const event = useSelector(DashboardSelectors.event)
    const projects = useSelector(DashboardSelectors.projects)
    const project_scores = useSelector(DashboardSelectors.projectScores) //To remove?
    console.log('projects', projects)
    console.log('project_scores', project_scores)
    console.log('Match', match)
    const isPartner =
        user.userId == 'google-oauth2|108766439620242776277' ||
        (useSelector(AuthSelectors.idTokenData)?.roles?.includes('Recruiter') &&
            !useSelector(AuthSelectors.idTokenData)?.roles?.includes(
                'SuperAdmin',
            ))
    return (
        <Box>
            <PageHeader heading="Dashboard" />
            {/*isPartner ? (
                <a href="https://junction-partner-guidebook-2022.notion.site/Partner-Guidebook-7f5b37bee5a9466cb801211c2b7d99e2">
                    Click here for guidebook!
                </a>
            ) : (
                <a href="https://guidebook2022.notion.site/guidebook2022/Participant-Guidebook-a98e9f36c4594c1ca757a1e2c120b587">
                    Click here for guidebook!
                </a>
            )*/}

            <Helmet>
                <title>Junction App || Dashboard</title>
                <meta
                    name="keywords"
                    content="Hackathon, hackathon platform, Junction, junction dashboard"
                />
                <meta name="title" content="Junction App || Dashboard" />
                <meta property="og:title" content="Junction App || Dashboard" />

                <meta
                    name="twitter:title"
                    content="Junction App || Dashboard"
                />
                <meta
                    name="description"
                    content="Log in to check out Europe's leading dashboard!"
                />
                <meta
                    property="og:description"
                    content="Log in to check out Europe's leading dashboard!"
                />
                <meta
                    name="twitter:description"
                    content="Log in to check out Europe's leading dashboard!"
                />

                <meta name="og:type" content="website" />
                <meta property="og:image" content={config.SEO_IMAGE_URL} />
                <meta name="twitter:image" content={config.SEO_IMAGE_URL} />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content={config.SEO_TWITTER_HANDLE} />
                <meta
                    name="twitter:creator"
                    content={config.SEO_TWITTER_HANDLE}
                />
            </Helmet>
            <Box mt={2} />
            <Grid container spacing={5}>
                <div
                    style={{
                        height: '400px',
                        width: '100%',
                        display: 'flex',
                        padding: '2em',
                    }}
                >
                    <AlertBlock alerts={alerts} />
                </div>
                <EventOverBlock />
                { projects ? (
                    <ProjectsGrid
                            projects={projects}
                            event={event}
                            onSelect={setSelected}
                            showScore={false}
                        />
                ) : null}
                <Dialog
                transitionDuration={0}
                fullScreen
                open={Boolean(selected)}
                onClose={() => setSelected()}
                >
                  <ProjectDetail
                      project={selected}
                      event={event}
                      onBack={() => setSelected()}
                      showTableLocation={false}
                  />
                </Dialog>
                <ReviewingPeriodBlock />
                <RegistrationStatusBlock />
                <TravelGrantStatusBlock />
                {/* <VisaInvitationBlock /> */}
                <CertificateBlock />
                <ProjectBlock />
                <TeamStatusBlock />
                <GavelReviewingBlock />
                <SocialMediaBlock />
            </Grid>
            {event && (
                <EventPageScriptIFrame
                    slug={event.slug}
                    pageId={EventPageScripts.PageScriptLocation.EVENT_DASHBOARD}
                    event={event}
                />
            )}
        </Box>
    )
}

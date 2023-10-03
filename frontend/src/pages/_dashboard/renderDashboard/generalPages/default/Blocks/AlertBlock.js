import React from 'react'
import { useSelector } from 'react-redux'
import { Grid, Typography } from '@material-ui/core'
import * as DashboardSelectors from 'redux/dashboard/selectors'
import GradientBox from 'components/generic/GradientBox'
import { Alerts } from '../../../../../../components/messaging/alerts'
import TimeLineBlock from '../Blocks/TimeLineBlock'

const makeBoxStyles = () => ({


    backgroundColor: '#f7fafc',
    border: `2px solid #e2e8f0`,
    borderRadius: '6px',
    height: '100%'

    //TODO: blurr the bottom

    // backgroundColor: '#f8f8f8',

})

const makeTimelineStyles = () => ({



    backgroundColor: '#f7fafc',
    border: `2px solid #e2e8f0`,
    borderRadius: '6px',
    height: '100%',

    overflow: 'auto',



    // backgroundColor: '#f8f8f8',

})

export default ({ alerts = [] }) => {
    return (
        <>
            <Grid
                direction="column"
                alignItems="stretch"
                item
                xs={8}
                style={{ marginLeft: '20px', marginRight: '20px' }}
            >
                <GradientBox
                    style={makeBoxStyles()}
                    color="theme_white"
                    p={3}
                >
                    <Typography variant="button" gutterBottom>
                        Announcements
                    </Typography>
                    <hr className="tw-h-px  tw-bg-gray-500 tw-border-0 tw-dark:bg-gray-900"></hr>
                    <Alerts alerts={alerts} />
                </GradientBox>

            </Grid>
            <Grid
                item
                xs={4}>
                <GradientBox
                    style={makeTimelineStyles()}
                    color="theme_white"
                    p={3}
                >
                    <Typography variant="button" gutterBottom>
                        Event Timeline
                    </Typography>
                    <hr className="tw-h-px  tw-bg-gray-500 tw-border-0 tw-dark:bg-gray-900"></hr>
                    <TimeLineBlock />
                </GradientBox>
            </Grid >
        </>
    )
}

import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import GradientBox from 'components/generic/GradientBox'
import { Alerts } from '../../../../../../components/messaging/alerts'
import TimeLineBlock from '../Blocks/TimeLineBlock'
import { useTranslation } from 'react-i18next'

const makeBoxStyles = () => ({
    backgroundColor: '#f7fafc',
    border: `2px solid #e2e8f0`,
    borderRadius: '6px',
    height: '100%',

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
    const { t } = useTranslation()
    return (
        <>
            {alerts && alerts.length > 0 && (
                // <Grid
                //     direction="column"
                //     alignItems="stretch"
                //     item
                //     xs={8}
                //     style={{ marginLeft: '20px', marginRight: '20px' }}
                // >
                <GradientBox style={makeBoxStyles()} color="theme_white" p={3}>
                    <Typography variant="button" gutterBottom>
                        {t('Announcements_')}
                    </Typography>
                    <hr className="tw-h-px  tw-bg-gray-500 tw-border-0 tw-dark:bg-gray-900"></hr>
                    <Alerts alerts={alerts} />
                </GradientBox>
                // </Grid>
            )}
            {/* <Grid item xs={alerts && alerts.length > 0 ? 4 : 12}> */}
            <GradientBox style={makeTimelineStyles()} color="theme_white" p={3}>
                <Typography variant="button" gutterBottom>
                    {t('Event_timeline_')}
                </Typography>
                <hr className="tw-h-px  tw-bg-gray-500 tw-border-0 tw-dark:bg-gray-900"></hr>
                <TimeLineBlock />
            </GradientBox>
            {/* </Grid> */}
        </>
    )
}

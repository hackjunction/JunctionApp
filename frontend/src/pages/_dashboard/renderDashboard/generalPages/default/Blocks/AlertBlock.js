import React from 'react'
import { Typography } from '@material-ui/core'
import GradientBox from 'components/generic/GradientBox'
import { Alerts } from '../../../../../../components/messaging/alerts'
import TimeLineBlock from '../Blocks/TimeLineBlock'
import { useTranslation } from 'react-i18next'

const makeBoxStyles = () => ({
    backgroundColor: '#f7fafc',
    border: `2px solid #e2e8f0`,
    borderRadius: '6px',
    height: '100%',
})

const makeTimelineStyles = () => ({
    backgroundColor: '#f7fafc',
    border: `2px solid #e2e8f0`,
    borderRadius: '6px',
    height: '100%',

    overflow: 'auto',
})

export default ({ alerts = [] }) => {
    const { t } = useTranslation()
    return (
        <>
            {alerts && alerts.length > 0 && (
                <GradientBox style={makeBoxStyles()} color="theme_white" p={3}>
                    <Typography variant="button" gutterBottom>
                        {t('Announcements_')}
                    </Typography>
                    <hr className="tw-h-px  tw-bg-gray-500 tw-border-0 tw-dark:bg-gray-900"></hr>
                    <Alerts alerts={alerts} />
                </GradientBox>
            )}
            <GradientBox style={makeTimelineStyles()} color="theme_white" p={3}>
                <Typography variant="button" gutterBottom>
                    {t('Event_timeline_')}
                </Typography>
                <hr className="tw-h-px  tw-bg-gray-500 tw-border-0 tw-dark:bg-gray-900"></hr>
                <TimeLineBlock />
            </GradientBox>
        </>
    )
}

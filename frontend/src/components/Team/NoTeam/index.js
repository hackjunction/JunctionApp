import { Typography } from '@material-ui/core'
import Button from 'components/generic/Button'
import { push } from 'connected-react-router'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'

export default ({ eventData = {}, onCreate }) => {
    const dispatch = useDispatch()
    const { t } = useTranslation()
    return (
        <div className="tw-flex tw-flex-col tw-gap-32 tw-py-12">
            <Typography className="tw-text-lg" variant="body1" component="p">
                {t('Team_none_')}
                {/* Your Team will appear here once you create it or get accepted to
                an existing team. */}
            </Typography>
            <div className="tw-flex tw-gap-4 tw-justify-start">
                <Button
                    onClick={() => {
                        dispatch(
                            push(`/dashboard/event/${eventData.slug}/team`),
                        )
                    }}
                    color="outlined_button"
                    variant="jOutlined"
                >
                    {t('Team_join_')}
                    {/* Join a team */}
                </Button>
                <Button onClick={onCreate} variant="jContained">
                    {t('Team_create_')}
                    {/* Create a team */}
                </Button>
            </div>
        </div>
    )
}

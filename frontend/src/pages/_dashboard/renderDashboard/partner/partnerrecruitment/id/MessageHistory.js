import React from 'react'

import moment from 'moment'
import { useSelector } from 'react-redux'
import {
    Typography,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import * as RecruitmentSelectors from 'reducers/recruitment/selectors'

export default ({ user }) => {
    const { t } = useTranslation()
    const actionHistoryByUser = useSelector(
        RecruitmentSelectors.actionHistoryByUser,
    )
    const userHistory = actionHistoryByUser[user.userId] || []
    const messages = userHistory.filter(action => action.type === 'message')

    if (messages.length === 0) {
        return (
            <Typography variant="body2">
                {t('No_previous_messages_', {
                    user: user.profile.firstName,
                })}
            </Typography>
        )
    }

    return (
        <>
            <Typography variant="body2">
                {t('Message_history_', {
                    user: user.profile.firstName,
                })}
            </Typography>
            <List className="tw-w-full">
                {messages.map(message => (
                    <ListItem key={message._id} alignItems="flex-start">
                        <ListItemAvatar>
                            <Avatar
                                alt={`${message._recruiter.firstName} ${message._recruiter.lastName}`}
                                src={message._recruiter.avatar}
                            />
                        </ListItemAvatar>
                        <ListItemText
                            primary={moment(message.createdAt).format('LLL')}
                            secondary={
                                <>
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        color="textPrimary"
                                    >
                                        {`From ${message._recruiter.firstName} ${message._recruiter.lastName}`}
                                    </Typography>
                                    {' — '}
                                    {message.data.message.replace(
                                        /<br>/g,
                                        '\n',
                                    )}
                                </>
                            }
                        />
                    </ListItem>
                ))}
            </List>
        </>
    )
}

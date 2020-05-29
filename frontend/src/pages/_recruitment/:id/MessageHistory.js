import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import moment from 'moment'
import { useSelector } from 'react-redux'
import {
    Typography,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
} from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import * as RecruitmentSelectors from 'redux/recruitment/selectors'

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },
}))

export default ({ user }) => {
    const { t, i18n } = useTranslation() // eslint-disable-line
    const actionHistoryByUser = useSelector(
        RecruitmentSelectors.actionHistoryByUser
    )
    const userHistory = actionHistoryByUser[user.userId] || []
    const messages = userHistory.filter(action => action.type === 'message')

    const classes = useStyles()
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
            <List className={classes.root}>
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
                                        className={classes.inline}
                                        color="textPrimary"
                                    >
                                        {`From ${message._recruiter.firstName} ${message._recruiter.lastName}`}
                                    </Typography>
                                    {' — '}
                                    {message.data.message.replace(
                                        /<br>/g,
                                        '\n'
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

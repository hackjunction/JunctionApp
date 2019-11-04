import React from 'react';

import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import { Typography, List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@material-ui/core';

import * as RecruitmentSelectors from 'redux/recruitment/selectors';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%'
    }
}));

const MessageHistory = ({ messages, user }) => {
    const classes = useStyles();
    if (messages.length === 0) {
        return (
            <Typography variant="body2">
                No previous messages with {user.profile.firstName}. When anyone from your organisation sends them a
                message, it'll show up here!
            </Typography>
        );
    }

    return (
        <React.Fragment>
            <Typography variant="body2">
                Here's your message history with {user.profile.firstName}. You'll also see messages sent from other
                people in your organisation, so that you don't accidentally send duplicates!
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
                                <React.Fragment>
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        className={classes.inline}
                                        color="textPrimary"
                                    >
                                        {`From ${message._recruiter.firstName} ${message._recruiter.lastName}`}
                                    </Typography>
                                    {' — '}
                                    {message.data.message.replace(/<br>/g, '\n')}
                                </React.Fragment>
                            }
                        />
                    </ListItem>
                ))}
            </List>
        </React.Fragment>
    );
};

const mapState = (state, ownProps) => {
    const actionHistory = RecruitmentSelectors.actionHistory(state);
    const messageHistory = actionHistory.filter(action => {
        return action.type === 'message' && action.user === ownProps.user.userId;
    });
    return {
        messages: messageHistory
    };
};

export default connect(mapState)(MessageHistory);

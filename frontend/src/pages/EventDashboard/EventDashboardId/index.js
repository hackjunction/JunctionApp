import React from 'react';

import QRCode from 'qrcode.react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';

import PageHeader from 'components/generic/PageHeader';

import * as UserSelectors from 'redux/user/selectors';
import * as DashboardSelectors from 'redux/dashboard/selectors';

const useStyles = makeStyles(theme => ({
    qrCodeWrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        [theme.breakpoints.up('lg')]: {
            flexDirection: 'row',
            alignItems: 'flex-start'
        }
    },
    textWrapper: {
        marginTop: theme.spacing(2),
        textAlign: 'center',
        [theme.breakpoints.up('lg')]: {
            textAlign: 'left',
            marginLeft: theme.spacing(2),
            marginTop: 0
        }
    }
}));

const EventDashboardId = ({ userProfile, event }) => {
    const classes = useStyles();
    return (
        <Box>
            <PageHeader
                heading="Your event ID"
                subheading={`Show this QR code at the entrance to gain access to ${event.name}`}
            />
            <Box mt={2} />
            <Box className={classes.qrCodeWrapper}>
                <QRCode value={userProfile.userId} size={300} />
                <Box className={classes.textWrapper}>
                    <Typography variant="h6">
                        {userProfile.firstName} {userProfile.lastName}
                    </Typography>
                    <Typography variant="subtitle1">{userProfile.email}</Typography>
                    <Typography variant="subtitle1">{userProfile.userId}</Typography>
                </Box>
            </Box>
        </Box>
    );
};

const mapState = state => ({
    userProfile: UserSelectors.userProfile(state),
    event: DashboardSelectors.event(state)
});

export default connect(mapState)(EventDashboardId);

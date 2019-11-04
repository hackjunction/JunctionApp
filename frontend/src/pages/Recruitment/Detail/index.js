import React, { useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';

import { withSnackbar } from 'notistack';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid, Dialog, Box } from '@material-ui/core';
import { Roles } from '@hackjunction/shared';
import CheckIcon from '@material-ui/icons/Check';

import PageWrapper from 'components/layouts/PageWrapper';

import CenteredContainer from 'components/generic/CenteredContainer';

import * as AuthSelectors from 'redux/auth/selectors';
import * as RecruitmentSelectors from 'redux/recruitment/selectors';

import UserProfilesService from 'services/userProfiles';

import * as RecruitmentActions from 'redux/recruitment/actions';

import { useFormField } from 'hooks/formHooks';

import DetailTop from './DetailTop';
import DetailSection from './DetailSection';
import MessageHistory from './MessageHistory';
import SkillRating from '../Search/SearchResults/SkillRating';
import TextAreaInput from 'components/inputs/TextAreaInput';
import FormControl from 'components/inputs/FormControl';
import Button from 'components/generic/Button';

const useStyles = makeStyles(theme => ({
    iconBlue: {
        backgroundColor: theme.palette.theme_turquoise.main,
        width: '20px',
        height: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        marginRight: '8px'
    },
    iconPurple: {
        backgroundColor: theme.palette.theme_purple.main,
        width: '20px',
        height: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        marginRight: '8px'
    },
    bold: {
        fontWeight: 'bold'
    }
}));

const DetailPage = ({ idToken, match, enqueueSnackbar, sendMessage }) => {
    const classes = useStyles();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [user, setUser] = useState();
    const message = useFormField(
        '',
        value => {
            if (value.length < 50) {
                return 'Your message must be at least 50 characters long';
            }
            if (value.length > 1000) {
                return "Your message can't be more than 1000 characters long";
            }

            return;
        },
        false,
        false
    );

    const { id } = match.params;

    useEffect(() => {
        if (id) {
            setLoading(true);

            UserProfilesService.getUserProfileRecruitment(id, idToken)
                .then(data => {
                    setUser(data);
                    console.log(data);
                })
                .catch(err => {
                    setError(true);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [idToken, id]);

    const handleSendMessage = useCallback(async () => {
        const err = message.validate();
        if (err) return;
        setLoading(true);
        const formatted = message.value.replace(/(?:\r\n|\r|\n)/g, '<br>');
        const res = await sendMessage(formatted, user.userId);

        if (res.error) {
            enqueueSnackbar('Something went wrong... Please try again.', {
                variant: 'error'
            });
        } else {
            message.reset();
            enqueueSnackbar('Message sent!', { variant: 'success' });
        }
        setLoading(false);
    }, [message, sendMessage, user, enqueueSnackbar]);

    return (
        <Dialog fullScreen open={true} transitionDuration={0}>
            <PageWrapper
                error={error}
                wrapContent={false}
                loading={loading || !user}
                render={() => (
                    <CenteredContainer>
                        <DetailTop user={user} />
                        <Box mt={3} />
                        <Grid container>
                            <Grid item xs={12} sm={6} md={4}>
                                <DetailSection label="Skills">
                                    <Box>
                                        {user.skills.map(skill => (
                                            <SkillRating data={skill} />
                                        ))}
                                    </Box>
                                </DetailSection>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <DetailSection label="Previous roles">
                                    {user.roles.map(role => (
                                        <Box mb={0.3}>
                                            <Typography className={classes.bold} variant="body2">
                                                {role.role}
                                            </Typography>
                                            <Typography variant="body2">
                                                {Roles.getLabelForExperienceLevel(role.years)}
                                            </Typography>
                                        </Box>
                                    ))}
                                </DetailSection>
                                <DetailSection label="Education">
                                    {user.education.university ? (
                                        <React.Fragment>
                                            <Typography className={classes.bold} variant="body2">
                                                {user.education.level}, {user.education.degree}
                                            </Typography>
                                            <Typography variant="body2">{user.education.university}</Typography>
                                            <Typography variant="body2">
                                                {user.education.graduationYear < new Date().getFullYear()
                                                    ? `Graduation year: ${user.education.graduationYear}`
                                                    : `Expected graduation year: ${user.education.graduationYear}`}
                                            </Typography>
                                        </React.Fragment>
                                    ) : (
                                        <Typography className={classes.bold} variant="body2">
                                            {user.education.level}
                                        </Typography>
                                    )}
                                </DetailSection>
                            </Grid>
                            <Grid item xs={12} md={4} container>
                                <Grid item xs={12} sm={6} md={12}>
                                    <DetailSection label="Industries of interest">
                                        {user.industriesOfInterest.map(industry => (
                                            <Box
                                                key={industry}
                                                display="flex"
                                                flexDirection="row"
                                                alignItems="center"
                                                mb={1}
                                            >
                                                <div className={classes.iconBlue}>
                                                    <CheckIcon fontSize="inherit" style={{ color: 'white' }} />
                                                </div>
                                                <Typography variant="body2">{industry}</Typography>
                                            </Box>
                                        ))}
                                    </DetailSection>
                                </Grid>
                                <Grid item xs={12} sm={6} md={12}>
                                    <DetailSection label="Themes of interest">
                                        {user.themesOfInterest.map(theme => (
                                            <Box
                                                key={theme}
                                                display="flex"
                                                flexDirection="row"
                                                alignItems="center"
                                                mb={1}
                                            >
                                                <div className={classes.iconPurple}>
                                                    <CheckIcon fontSize="inherit" style={{ color: 'white' }} />
                                                </div>
                                                <Typography variant="body2">{theme}</Typography>
                                            </Box>
                                        ))}
                                    </DetailSection>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <DetailSection label="Message history">
                                    <MessageHistory user={user} />
                                </DetailSection>
                            </Grid>
                            <Grid item xs={12}>
                                <DetailSection label="Send message">
                                    <FormControl
                                        touched={true}
                                        error={message.error}
                                        hint={`Type a message for ${user.profile.firstName} here. They will receive an email notification with the message as well as your email address, so you can continue the conversation in the medium of your choice.`}
                                    >
                                        <TextAreaInput
                                            label="Your message"
                                            placeholder={`Hi ${user.profile.firstName}! We're hiring, and I'm just reaching out to let you know that...`}
                                            value={message.value}
                                            onChange={message.onChange}
                                        />
                                    </FormControl>
                                    <Box mt={2} display="flex" flexDirection="row" justifyContent="flex-end">
                                        <Button
                                            disabled={message.error}
                                            onClick={handleSendMessage}
                                            color="secondary"
                                            variant="contained"
                                        >
                                            Send message
                                        </Button>
                                    </Box>
                                </DetailSection>
                            </Grid>
                        </Grid>
                    </CenteredContainer>
                )}
            />
        </Dialog>
    );
};

const mapState = state => {
    return {
        idToken: AuthSelectors.getIdToken(state)
    };
};
const mapDispatch = dispatch => ({
    sendMessage: (message, userId) => dispatch(RecruitmentActions.sendMessage(message, userId))
});

export default withSnackbar(
    connect(
        mapState,
        mapDispatch
    )(DetailPage)
);

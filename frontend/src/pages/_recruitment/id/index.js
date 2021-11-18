import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouteMatch } from 'react-router'
import { makeStyles } from '@material-ui/core/styles'
import { Typography, Grid, Dialog, Box, Chip } from '@material-ui/core'
import { Roles, Misc } from '@hackjunction/shared'
import CheckIcon from '@material-ui/icons/Check'

import PageWrapper from 'components/layouts/PageWrapper'

import Container from 'components/generic/Container'

import UserProfilesService from 'services/userProfiles'

import * as AuthSelectors from 'redux/auth/selectors'
import * as SnackbarActions from 'redux/snackbar/actions'

import { useFormField } from 'hooks/formHooks'

import DetailTop from './DetailTop'
import DetailSection from './DetailSection'
import MessageHistory from './MessageHistory'
import SkillRating from '../default/SearchResults/SkillRating'
import TextAreaInput from 'components/inputs/TextAreaInput'
import FormControl from 'components/inputs/FormControl'
import Button from 'components/generic/Button'
import { useTranslation } from 'react-i18next'

const useStyles = makeStyles(theme => ({
    iconBlue: {
        backgroundColor: theme.palette.theme_turquoise.main,
        width: '20px',
        height: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        marginRight: '8px',
    },
    iconPurple: {
        backgroundColor: theme.palette.theme_purple.main,
        width: '20px',
        height: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        marginRight: '8px',
    },
    bold: {
        fontWeight: 'bold',
    },
}))

export default () => {
    const classes = useStyles()
    const idToken = useSelector(AuthSelectors.getIdToken)
    const dispatch = useDispatch()
    const match = useRouteMatch()
    const { t } = useTranslation()

    // const sendMessage = useCallback(
    //     (message, userId) => {
    //         dispatch(RecruitmentActions.sendMessage(message, userId))
    //     },
    //     [dispatch],
    // )

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [user, setUser] = useState(null)
    const message = useFormField(
        '',
        value => {
            if (value.length < 50) {
                return t('Your_message_length_')
            }
            if (value.length > 1000) {
                return t('Your_message_long')
            }

            return
        },
        false,
        false,
    )

    const { id } = match.params

    useEffect(() => {
        if (id) {
            setLoading(true)

            UserProfilesService.getUserProfileRecruitment(id, idToken)
                .then(data => {
                    setUser(data)
                })
                .catch(err => {
                    setError(true)
                })
                .finally(() => {
                    setLoading(false)
                })
        }
    }, [idToken, id])

    const handleSendMessage = useCallback(async () => {
        const err = message.validate()
        console.log('user is', user)
        if (!err && user !== null) {
            setLoading(true)
            //const formatted = message.value.replace(/(?:\r\n|\r|\n)/g, '<br>')
            //const res = await sendMessage(formatted, user.userId)

            // TODO fix snackbar here
            /*if (res?.error) {
                dispatch(SnackbarActions.error(t('Something_went_wrong_')))
            } else {*/
            message.reset()
            dispatch(SnackbarActions.success(t('Message_sent_')))
            //}
            setLoading(false)
        }
    }, [message, user, dispatch, t])

    // TODO A little bit hard to define for translating
    const renderRecruitmentStatus = () => {
        switch (user.recruitmentOptions.status) {
            case Misc.recruitmentStatuses.items['actively-looking'].id:
                return (
                    <Chip
                        label={
                            'Recruitment: ' +
                            Misc.recruitmentStatuses.items['actively-looking']
                                .label
                        }
                        color="primary"
                        variant="outlined"
                    />
                )
            case Misc.recruitmentStatuses.items['up-for-discussions'].id:
                return (
                    <Chip
                        label={
                            'Recruitment: ' +
                            Misc.recruitmentStatuses.items['up-for-discussions']
                                .label
                        }
                        color="secondary"
                        variant="outlined"
                    />
                )
            default:
                return null
        }
    }

    const renderRelocationStatus = () => {
        switch (user.recruitmentOptions.relocation) {
            case Misc.relocationOptions.items['looking-for-change'].id:
                return (
                    <Chip
                        label={
                            'Relocation: ' +
                            Misc.relocationOptions.items['looking-for-change']
                                .label
                        }
                        color="primary"
                        variant="outlined"
                    />
                )
            case Misc.relocationOptions.items['willing-to-relocate'].id:
                return (
                    <Chip
                        label={
                            'Relocation: ' +
                            Misc.relocationOptions.items['willing-to-relocate']
                                .label
                        }
                        color="primary"
                        variant="outlined"
                    />
                )
            case Misc.relocationOptions.items['not-currently'].id:
                return (
                    <Chip
                        label={
                            'Relocation: ' +
                            Misc.relocationOptions.items['not-currently'].label
                        }
                        color="secondary"
                        variant="outlined"
                    />
                )
            default:
                return null
        }
    }

    return (
        <Dialog fullScreen open={true} transitionDuration={0}>
            <PageWrapper
                error={error}
                wrapContent={false}
                loading={loading}
                render={() => (
                    <Container center>
                        <DetailTop user={user} />
                        <Box mt={3} />
                        <Grid container>
                            <>
                                <Grid item xs={9} md={8}>
                                    <DetailSection label="Biography">
                                        <Typography variant="body2">
                                            {user.profile.biography}
                                        </Typography>
                                    </DetailSection>
                                </Grid>
                            </>
                            <Grid item xs={3} md={4}>
                                <Box
                                    p={2}
                                    display="flex"
                                    flexDirection="row"
                                    flexWrap="wrap"
                                    justifyContent="flex-start"
                                >
                                    <Box ml={0.5} mr={0.5} mb={0.5}>
                                        {renderRecruitmentStatus()}
                                    </Box>
                                    <Box ml={0.5} mr={0.5} mb={0.5}>
                                        {renderRelocationStatus()}
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <DetailSection label="Skills">
                                    <Box>
                                        {user.skills.map(skill => (
                                            <SkillRating
                                                showTooltip
                                                data={skill}
                                            />
                                        ))}
                                    </Box>
                                </DetailSection>
                                <DetailSection label="Spoken languages">
                                    <Typography variant="body2">
                                        {user.profile.spokenLanguages.join(
                                            ', ',
                                        )}
                                    </Typography>
                                </DetailSection>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <DetailSection label="Previous roles">
                                    {user.roles.map(role => (
                                        <Box mb={0.3}>
                                            <Typography
                                                className={classes.bold}
                                                variant="body2"
                                            >
                                                {role.role}
                                            </Typography>
                                            <Typography variant="body2">
                                                {Roles.getLabelForExperienceLevel(
                                                    role.years,
                                                )}
                                            </Typography>
                                        </Box>
                                    ))}
                                </DetailSection>
                                <DetailSection label="Education">
                                    {typeof user.education !== 'undefined' ? (
                                        user.education.university ? (
                                            <>
                                                <Typography
                                                    className={classes.bold}
                                                    variant="body2"
                                                >
                                                    {user.education.level},{' '}
                                                    {user.education.degree}
                                                </Typography>
                                                <Typography variant="body2">
                                                    {user.education.university}
                                                </Typography>
                                                <Typography variant="body2">
                                                    {user.education
                                                        .graduationYear <
                                                    new Date().getFullYear()
                                                        ? `Graduation year: ${user.education.graduationYear}`
                                                        : `Expected graduation year: ${user.education.graduationYear}`}
                                                </Typography>
                                            </>
                                        ) : (
                                            <Typography
                                                className={classes.bold}
                                                variant="body2"
                                            >
                                                {user.education.level}
                                            </Typography>
                                        )
                                    ) : null}
                                </DetailSection>
                            </Grid>
                            <Grid item xs={12} md={4} container>
                                <Grid item xs={12} sm={6} md={12}>
                                    <DetailSection label="Industries of interest">
                                        {user.industriesOfInterest.map(
                                            industry => (
                                                <Box
                                                    key={industry}
                                                    display="flex"
                                                    flexDirection="row"
                                                    alignItems="center"
                                                    mb={1}
                                                >
                                                    <div
                                                        className={
                                                            classes.iconBlue
                                                        }
                                                    >
                                                        <CheckIcon
                                                            fontSize="inherit"
                                                            style={{
                                                                color: 'white',
                                                            }}
                                                        />
                                                    </div>
                                                    <Typography variant="body2">
                                                        {industry}
                                                    </Typography>
                                                </Box>
                                            ),
                                        )}
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
                                                <div
                                                    className={
                                                        classes.iconPurple
                                                    }
                                                >
                                                    <CheckIcon
                                                        fontSize="inherit"
                                                        style={{
                                                            color: 'white',
                                                        }}
                                                    />
                                                </div>
                                                <Typography variant="body2">
                                                    {theme}
                                                </Typography>
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
                                    <Box
                                        mt={2}
                                        display="flex"
                                        flexDirection="row"
                                        justifyContent="flex-end"
                                    >
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
                    </Container>
                )}
            />
        </Dialog>
    )
}

import React, { useEffect, useState, useCallback } from 'react'
import { useLocation } from 'react-router'
import { useDispatch } from 'react-redux'
import { push } from 'connected-react-router'

import { Button, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import { TextField } from '@material-ui/core'

import Divider from 'components/generic/Divider'
import Footer from 'components/layouts/Footer'
import PageWrapper from 'components/layouts/PageWrapper'

import CenteredContainer from 'components/generic/CenteredContainer'
import GlobalNavBar from 'components/navbars/GlobalNavBar'
import config from 'constants/config'

// import * as AuthSelectors from 'redux/auth/selectors'
import * as SnackbarActions from 'redux/snackbar/actions'
import * as AuthActions from 'redux/auth/actions'
import EmailService from 'services/email'
import Shared from '@hackjunction/shared'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet'

const useStyles = makeStyles(theme => ({
    wrapper: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: theme.spacing(3),
        background: 'black',
        color: 'white',
    },
    logo: {
        width: '200px',
        height: '200px',
    },
    title: {
        color: 'white',
        textTransform: 'uppercase',
        textAlign: 'center',
    },
    subtitle: {
        color: 'white',
        textAlign: 'center',
    },
    error: {
        color: theme.palette.error.main,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(0.5, 1),
    },
}))

export default () => {
    const dispatch = useDispatch()
    const classes = useStyles()
    const location = useLocation()
    // const idToken = useSelector(AuthSelectors.getIdToken)

    const [loading, setLoading] = useState(false)
    const [subject, setSubject] = useState('')
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [organisation, setOrganisation] = useState('')
    const [message, setMessage] = useState('')

    const { t } = useTranslation()

    useEffect(() => {
        dispatch(AuthActions.clearSession())
    }, [dispatch])
    // TODO there isn't message which tells which field is needed
    const sendEmail = useCallback(() => {
        if (
            !(message.length > 0 && subject.length > 0) &&
            Shared.Utils.isEmail(email)
        ) {
            return
        }
        setLoading(true)
        const params = {
            subject: 'App Contact Form: ' + subject,
            subtitle: name + (organisation ? ' from ' + organisation : ''),
            body: message,
            reply_to: email,
        }
        EmailService.sendContactEmail(params)
            .then(() => {
                dispatch(SnackbarActions.success('Contact mail sent'))
            })
            .catch(err => {
                dispatch(SnackbarActions.error('Something went wrong...'))
            })
            .finally(() => {
                setLoading(false)
                setMessage('')
                setSubject('')
                setEmail('')
                setName('')
                setOrganisation('')
            })
        return null
    }, [dispatch, email, message, name, organisation, subject])

    const error = location?.state?.error

    return (
        <PageWrapper
            header={() => <GlobalNavBar />}
            footer={() => <Footer hide_contact={true} />}
            render={() => (
                <>
                    <Helmet>
                        <title>{config.PLATFORM_OWNER_NAME}</title>
                        <meta
                            name="keywords"
                            content="Hackathon, hackathon platform, Junction"
                        />
                        <meta
                            name="title"
                            content="Junction App || Contact us"
                        />
                        <meta
                            property="og:title"
                            content="Junction App || Contact us"
                        />

                        <meta
                            name="twitter:title"
                            content="Junction App || Contact us"
                        />
                        <meta
                            name="description"
                            content="If you're interested in hearing more from us, the easiest way to contact us is through this contact form.!"
                        />
                        <meta
                            property="og:description"
                            content="If you're interested in hearing more from us, the easiest way to contact us is through this contact form.!"
                        />
                        <meta
                            name="twitter:description"
                            content="If you're interested in hearing more from us, the easiest way to contact us is through this contact form.!"
                        />

                        <meta name="og:type" content="website" />
                        <meta
                            property="og:image"
                            content={config.SEO_IMAGE_URL}
                        />
                        <meta
                            name="twitter:image"
                            content={config.SEO_IMAGE_URL}
                        />
                        <meta property="og:image:width" content="1200" />
                        <meta property="og:image:height" content="630" />
                        <meta
                            name="twitter:card"
                            content="summary_large_image"
                        />
                        <meta
                            name="twitter:site"
                            content={config.SEO_TWITTER_HANDLE}
                        />
                        <meta
                            name="twitter:creator"
                            content={config.SEO_TWITTER_HANDLE}
                        />
                    </Helmet>
                    <CenteredContainer wrapperClass={classes.backButtonWrapper}>
                        <Button onClick={() => dispatch(push('/'))}>
                            <ArrowBackIosIcon style={{ color: 'black' }} />
                            <Typography
                                variant="button"
                                style={{ color: 'black' }}
                            >
                                {t('Back_')}
                            </Typography>
                        </Button>
                    </CenteredContainer>
                    <CenteredContainer>
                        <h2>
                            {t('Contact_')} {config.PLATFORM_OWNER_NAME}
                        </h2>
                        <TextField
                            style={{ width: '60%' }}
                            label={'Subject'}
                            required={true}
                            value={subject}
                            onChange={e => setSubject(e.target.value)}
                            margin="dense"
                            variant="filled"
                        />
                    </CenteredContainer>
                    <CenteredContainer>
                        <TextField
                            style={{ width: '60%' }}
                            label={'Email'}
                            value={email}
                            required={true}
                            onChange={e => setEmail(e.target.value)}
                            margin="dense"
                            variant="filled"
                        />
                    </CenteredContainer>
                    <CenteredContainer>
                        <TextField
                            style={{ width: '60%' }}
                            label={'Name'}
                            value={name}
                            onChange={e => setName(e.target.value)}
                            margin="dense"
                            variant="filled"
                        />
                    </CenteredContainer>
                    <CenteredContainer>
                        <TextField
                            style={{ width: '60%' }}
                            label={'Organisation'}
                            value={organisation}
                            onChange={e => setOrganisation(e.target.value)}
                            margin="dense"
                            variant="filled"
                        />
                    </CenteredContainer>
                    <CenteredContainer>
                        <TextField
                            style={{ width: '60%' }}
                            label={'Message'}
                            required={true}
                            value={message}
                            onChange={e => setMessage(e.target.value)}
                            margin="dense"
                            variant="filled"
                            multiline
                            rows={10}
                            rowsMax={100}
                        />
                    </CenteredContainer>
                    <CenteredContainer>
                        <Button
                            color="primary"
                            variant="contained"
                            loading={loading}
                            onClick={sendEmail}
                        >
                            {t('Send_')}
                        </Button>
                    </CenteredContainer>
                    <Divider />
                </>
            )}
        />
    )
}
